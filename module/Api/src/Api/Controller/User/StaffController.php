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
				'isActive' => $data['isActive'],
				'profileUpdated' => '0',
				'city' => $data['city'],
				'createdTime' => new \DateTime( 'now' ),
				'lastLogin' => new \DateTime( 'now' ),
				'email' => $data['email'],
				'firstName' => $data['firstName'],
				'lastName' => $data['lastName'],
				'name' => $data['name'],
				'password' => $data['password'],
				'phone' => $data['phone'],
                'cellphone' => $data['cellphone'],
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
            $staff->setName( $data['name'] );
			$staff->save($entityManager);
			$staffData = $staff->getData();

			return new JsonModel( $staffData );
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
            'bankInfo' => $bankInfo ? $bankInfo->getData() : null,
            'resume' => $resume ? $resume->getData():null,
            'cvfiles' => $cvfiles
        ]);
    }

    public function update($id, $data){
        // $userId = $this->getEvent()->getRouteMatch()->getParam('user_id');
        $entityManager = $this->getEntityManager();
        $user = $this->getUserById($id);
        $staff = $user->getStaff();
        $staff->setType ( $entityManager->getRepository('\User\Entity\Roles')->find( $data['type'] ) );
        // $staff->updateData( $data );
        $staff->setName( $data['name'] );
        $staff->save($entityManager);

        return new JsonModel([$data['type']]);
    }

    public function getList(){
        $entityManager = $this->getEntityManager();
        $user = $this->getCurrentUser();

        // Get staff group
        $staffGroup = $entityManager->find('User\Entity\UserGroup', UserGroup::ADMIN_GROUP_ID);
        $staffList = $entityManager->getRepository('User\Entity\User');

                                //->findBy(array('group' => $freelancerGroup));
        $queryBuilder = $staffList->createQueryBuilder('user');
        // check search condition
        $request = $this->getRequest();
        if($request->getQuery('search') && $request->getQuery('type')) {
            $role = $entityManager->getRepository('User\Entity\Roles')->findBy(array('id' => $request->getQuery('type')));
            $queryBuilder->leftJoin('user.staff', 'staff')->where('staff.client=?1 and staff.type=?2')->setParameter(1, $user)->setParameter(2, $role);
        } else {
            $queryBuilder->leftJoin('user.staff', 'staff')->where('staff.client=?1')->setParameter(1, $user);
        }

        $queryBuilder->andWhere("user.group = 3");

        if($request->getQuery('search')){
            // search by country aa
            if($request->getQuery('country')){
                $country = $entityManager->getRepository('User\Entity\Country')->findBy(array('id'=>(int)$request->getQuery('country')));
                $queryBuilder->andWhere("user.country=?3")->setParameter(3, $country);
            }
            // search by name
            if($request->getQuery('name')){
                $arrayName = explode(' ', $request->getQuery('name'));
                if(count($arrayName) != 2){
                    $queryBuilder->andWhere("user.firstName like '%".$request->getQuery('name')."%' OR user.lastName like '%".$request->getQuery('name')."%'");

                }else{
                    $queryBuilder->andWhere("user.firstName like '%".$arrayName[0]."%' OR user.lastName like '%".$arrayName[1]."%'");
                }
            }
            if ( $request->getQuery('email') ) {
                $queryBuilder->andWhere("user.email like '%". $request->getQuery('email')."%'");
            }
            if ( $request->getQuery('alias') ) {
                $queryBuilder->andWhere("user.alias like '%".$request->getQuery('alias')."%'");
            }

            // search by id
            if($request->getQuery('idStaff')){
                $queryBuilder->andWhere("user.id=$request->getQuery('idStaff')");
            }

            // search include inactive
            if(!$request->getQuery('includeInactive') || ($request->getQuery('includeInactive') && $request->getQuery('includeInactive') == 'false')){
                $queryBuilder->andWhere("user.isActive='1'");
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
                $userData['staff'] = $user->getStaff()->getData();
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