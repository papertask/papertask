<?php
/**
 * Created by PhpStorm.
 * User: antiprovn
 * Date: 9/27/14
 * Time: 9:19 PM
 */
namespace Api\Controller\User;

use Zend\View\Model\JsonModel;

use Application\Controller\AbstractRestfulController;
use DoctrineORMModule\Paginator\Adapter\DoctrinePaginator as DoctrineAdapter;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
use Zend\Paginator\Paginator;
use User\Entity\User;
use User\Entity\UserGroup;
use Admin\Model\Helper;
use Doctrine\Common\Collections\Criteria;
use User\Entity\CvFile;
use User\Entity\Roles;

class StaffController extends AbstractRestfulController
{
	public function create ( $data ) 
	{
		$entityManager = $this->getEntityManager();
		$pdata = array(
				'isActive' => '0',
				'profileUpdated' => '0',
				'city' => $data['city'],
				'createdTime' => new \DateTime( 'now' ),
				'lastLogin' => new \DateTime( 'now' ),
				'email' => $data['email'],
				'firstName' => $data['firstName'],
				'lastName' => $data['lastName'],
				'name' => $data['lastName']." ".$data['firstName'],
				'password' => $data['password'],
				'phone' => $data['phone'],
				'gender' => $data['gender'],
				'country' => $entityManager->getRepository('User\Entity\Country')->findOneBy(array('id' => $data['country']))
		);
		$userExist = $entityManager->getRepository('User\Entity\User')->findOneBy(array('email'=>$data['email']));
		
		if ( $userExist ) 
		{
			
		}
		else
		{
			$user = new User();
			$user->createStaff( $this, $pdata );
			$staff = $user->getStaff();
			$staff->setType( $entityManager->getRepository('User\Entity\Roles')->findOneBy(array('id' => $data['type'])) );
            $staff->setClient( $this->getCurrentUser() );
			$staff->save($entityManager);
			
			$staffData = $staff->getData();
			
			return new JsonModel( $user->getData() );
		}
		return new JsonModel( [] );
	}
	
    public function get( $id ){
        $user = $this->getUserById( $id );        
        $staffData = $user->getStaff()->getData();
        $entityManager = $this->getEntityManager();
        $bankInfo = $entityManager->getRepository('\User\Entity\BankInfo')
            ->findOneBy(['user' => $user]);
        $resume = $entityManager->getRepository('\User\Entity\Resume')
            ->findOneBy(['user' => $user]);
        $cvfile = $entityManager->getRepository('\User\Entity\CvFile')
            ->findBy(['user' => $user]);
        $cvfiles = array();
        foreach ( $cvfile as $k => $v ) {
            $cvfiles[$k] = $v->getData();
        }   
        return new JsonModel([
            'staff' => $staffData,
            'bankInfo' => $bankInfo->getData(),
            'resume' => $resume->getData(),
            'cvfiles' => $cvfiles
        ]);
    }

    public function update($id, $data){
        // $userId = $this->getEvent()->getRouteMatch()->getParam('user_id');
        $entityManager = $this->getEntityManager();
        $user = $this->getUserById($id);
        $staff = $user->getStaff();
        $staff->setType = $entityManager->getRepository('\User\Entity\Roles')->find($data['type']);
        // $staff->updateData($data, $entityManager);
        $staff->save($entityManager);

        return new JsonModel([]);
    }

    public function getList(){
        $entityManager = $this->getEntityManager();
        $user = $this->getCurrentUser();

        // Get staff group
        $staffGroup = $entityManager->find('User\Entity\UserGroup', UserGroup::ADMIN_GROUP_ID);
        $staffList = $entityManager->getRepository('User\Entity\User');

                                //->findBy(array('group' => $freelancerGroup));
        $queryBuilder = $staffList->createQueryBuilder('user');

        $queryBuilder->innerJoin('user.staff', 'staff')->where('staff.client=?1')->setParameter(1, $user);
        $queryBuilder->andWhere("user.group = 3");
        // check search condition
        $request = $this->getRequest();
        if($request->getQuery('search')){
            
            // search by name
            if($request->getQuery('name')){
                $arrayName = explode(' ', $request->getQuery('name'));
                echo $arrayName[0];
                if(count($arrayName) != 2){
                    $queryBuilder->andWhere("user.firstName like ?1 OR user.lastName like ?1")
                        ->setParameter(1, '%' . $request->getQuery('name') . '%');
                }else{
                    $queryBuilder->andWhere("(user.firstName like ?1 AND user.lastName like ?2)
                                        OR (user.lastName like ?1 AND user.firstName like ?2)")
                        ->setParameter(1, '%' . $arrayName[0] . '%')
                        ->setParameter(2, '%' . $arrayName[1] . '%');
                }
            }

            // search by id
            if($request->getQuery('idStaff')){
                $queryBuilder->andWhere("user.id = ?1")
                    ->setParameter(1, (int)$request->getQuery('idStaff'));
            }

            // search by country aa
            if($request->getQuery('country')){
                $queryBuilder->andWhere("user.country = ?1")
                    ->setParameter(1, $request->getQuery('country'));
            }

            // search include inactive
            if(!$request->getQuery('includeInactive')){
                $queryBuilder->andWhere("user.isActive = ?1")
                    ->setParameter(1, 1);
            }
        }

        $queryBuilder->orderBy('user.createdTime', 'ASC');
        $adapter = new DoctrineAdapter(new ORMPaginator($queryBuilder));
        $paginator = new Paginator($adapter);
        $paginator->setDefaultItemCountPerPage(10);

        $page = (int)$this->getRequest()->getQuery('page');
        if($page) $paginator->setCurrentPageNumber($page);
        $data = array();
        $helper = new Helper();
        if(count($paginator) > 0){
            foreach($paginator as $user){
                $userData = $user->getData();
                $userData['createdTime'] = $helper->formatDate($userData['createdTime']);
                $data[] = $userData;
            }
            return new JsonModel(array(
                'staffList' => $data,
                'pages' => $paginator->getPages()
            ));
        }
        return new JsonModel([
            'staffList' => []
        ]);
    }

    public function delete($id){
        $entityManager = $this->getEntityManager();
        $user = $entityManager->find('\User\Entity\User', (int)$id);
        $staff = $user->getStaff();
        $entityManager->remove( $user );
        $entityManager->flush();
        $entityManager->remove( $staff );
        $entityManager->flush();
        
        return new JsonModel([]);
    }
}