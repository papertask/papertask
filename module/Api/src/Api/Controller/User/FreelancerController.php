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
use User\Entity\UserGroup;
use User\Entity\User;
use Admin\Model\Helper;
use Doctrine\Common\Collections\Criteria;

class FreelancerController extends AbstractRestfulController
{
    public function get($id){
        $user = $this->getUserById($id);
        $freelancerData = $user->getFreelancer()->getData();

        return new JsonModel([
            'freelancer' => $freelancerData,
        ]);
    }

    public function update($id, $data){
        $userId = $this->getEvent()->getRouteMatch()->getParam('user_id');
        $entityManager = $this->getEntityManager();
        $user = $this->getUserById($userId);
        $freelancer = $user->getFreelancer();

        $freelancer->updateData($data, $entityManager);
        $freelancer->save($entityManager);

        return new JsonModel([]);
    }

    public function getList(){
        $entityManager = $this->getEntityManager();

        // Get freelancer group
        $freelancerGroup = $entityManager->find('User\Entity\UserGroup', UserGroup::FREELANCER_GROUP_ID);
        $freelancerList = $entityManager->getRepository('User\Entity\User');
                                //->findBy(array('group' => $freelancerGroup));
        $queryBuilder = $freelancerList->createQueryBuilder('user')
            ->where("user.group = :group1")->setParameter('group1', $freelancerGroup);

        // check search condition
        $request = $this->getRequest();
        if($request->getQuery('search')){

            // search by name
            if($request->getQuery('name')){
                $arrayName = explode(' ', $request->getQuery('name'));
                if(count($arrayName) != 2){
                    $queryBuilder->andWhere("user.firstName like :name1 OR user.lastName like :name1")
                        ->setParameter('name1', '%' . $request->getQuery('name') . '%');
                }else{
                    $queryBuilder->andWhere("(user.firstName like :name1 AND user.lastName like :name2)
                                        OR (user.lastName like :name1 AND user.firstName like :name2)")
                        ->setParameter('name1', '%' . $arrayName[0] . '%')
                        ->setParameter('name2', '%' . $arrayName[1] . '%');
                }
            }

            // search by id
            if($request->getQuery('idFreelancer')){
                $queryBuilder->andWhere("user.id = ?1")
                    ->setParameter(1, (int)$request->getQuery('idFreelancer'));
            }

            // search by country aa
            if($request->getQuery('country')){
                $queryBuilder->andWhere("user.country = :counttry1")
                    ->setParameter('counttry1', $request->getQuery('country'));
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
                'freelancerList' => $data,
                'pages' => $paginator->getPages()
            ));
        }
        return new JsonModel([
            'freelancerList' => []
        ]);
    }

    public function delete($id){
        $entityManager = $this->getEntityManager();
        $user = $entityManager->find('\User\Entity\User', (int)$id);
        $entityManager->remove($user);
        $entityManager->flush();

        return new JsonModel([]);
    }
}