<?php
/**
 * Zend Framework (http://framework.zend.com/)
 *
 * @link      http://github.com/zendframework/ZendSkeletonAdmin for the canonical source repository
 * @copyright Copyright (c) 2005-2014 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace Admin\Controller;

use User\Entity\Roles;
use Zend\Permissions\Rbac\Role;
use Zend\View\Model\ViewModel;
use Zend\View\Model\JsonModel;

use Application\Controller\AbstractActionController;
use User\Entity\CvFile;

class StaffController extends AbstractActionController
{
    protected $requiredLogin = true;

    public function indexAction(){
        return new ViewModel();
    }

    public function viewAction(){
        $entityManager = $this->getEntityManager();
        $id = $this->getRequest()->getQuery('id');
        $user = $entityManager->find('\User\Entity\User', (int)$id);
        if($entityManager->find('\User\Entity\Staff', $user->getStaff())){
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

            return new ViewModel(array(
                "user" => $user->getData(),
                'staff' => $user->getStaff()->getId(),
                'bankInfo' => $bankInfo->getData(),
                'resume' => $resume->getData(),
                'cvfiles' => $cvfiles
            ));
        }
    }

    public function newAction(){
        return new ViewModel([]);
    }

    public function editProfileAction(){
        $entityManager = $this->getEntityManager();
        $id = $this->getRequest()->getQuery('id');
        $user = $entityManager->find('\User\Entity\User', (int)$id);
        if($entityManager->find('\User\Entity\Staff', $user->getStaff())){
            return new ViewModel([
                "user" => $user->getData()
            ]);
        }
    }

    public function editPaymentInfo(){
        $entityManager = $this->getEntityManager();
        $id = $this->getRequest()->getQuery('id');
        $user = $entityManager->find('\User\Entity\User', (int)$id);
        if($entityManager->find('\User\Entity\Staff', $user->getStaff())){
            return new ViewModel([
                "user" => $user->getData()
            ]);
        }
    }
    
    public function uploadFileAction() {
        if ( !empty( $_FILES ) ) {

            $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
            $name = $_FILES[ 'file' ][ 'name' ];

            $uploadPath = 'public/uploads' . DIRECTORY_SEPARATOR . $name;

            move_uploaded_file( $tempPath, $uploadPath );
            $file = new CvFile();
           
            $file->setData([
                'name' => $_FILES[ 'file' ][ 'name' ],
                'path' => $uploadPath,
                'size' => $_FILES['file']['size'],
                'time' => time(),
            ]);
            $file->save( $this->getEntityManager() );
            $answer = [
                'file' => $file->getData(),
                'success' => true,
            ];
            return new JsonModel( $answer );

        } else {
            $answer = ['success' => false];
            return new JsonModel( $answer );
        }
    }
    
    public function deleteFileAction( ) {
        $entityManager = $this->getEntityManager();
        $fid = $this->getRequest()->getQuery('fid');
        $cvfile = $entityManager->find('\User\Entity\CvFile', (int)$fid);
        $entityManager->remove( $cvfile );
        $entityManager->flush();
        $answer = ["success" => true];
        
        return new JsonModel( $answer );
    }

    public function getPmListAction() {
        $entityManager = $this->getEntityManager();

        // Get staff group
        $staffList = $entityManager->getRepository('User\Entity\Staff');
        //->findBy(array('group' => $freelancerGroup));
        $queryBuilder = $staffList->createQueryBuilder('staff')
            ->where("staff.type = ".Roles::PM_ROLE_ID);

        // check search condition
        $request = $this->getRequest();
        // if($request->getQuery('clientid')){
            $client = $this->getCurrentUser();
            $queryBuilder->andWhere("staff.client = ?1")
                ->setParameter(1, $client);
        // }

        $query = $queryBuilder->getQuery();
        $result = $query->getArrayResult();
        return new JsonModel([
            'pmlist' => $result
        ]);
    }

    public function getSalesListAction() {
        $entityManager = $this->getEntityManager();

        // Get staff group
        $staffGroup = $entityManager->find('User\Entity\Roles', Roles::SALES_ROLE_ID);
        $staffList = $entityManager->getRepository('User\Entity\Staff');
        //->findBy(array('group' => $freelancerGroup));
        $queryBuilder = $staffList->createQueryBuilder('staff')
            ->where("staff.type = ".Roles::SALES_ROLE_ID);

        // check search condition
        $request = $this->getRequest();
        $client = $this->getCurrentUser();
        // if($request->getQuery('clientid')){
            $queryBuilder->andWhere("staff.client = ?1")
                ->setParameter(1, $client);
       //  }

        $query = $queryBuilder->getQuery();
        $result = $query->getArrayResult();
        return new JsonModel([
            'saleslist' => $result
        ]);
    }
}
