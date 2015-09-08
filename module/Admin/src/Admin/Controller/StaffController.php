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
        $lang_code = $this->params()->fromRoute('lang');
		return new ViewModel(array(
			"lang_code" => $lang_code,
        ));
    }

    public function viewAction(){
        $entityManager = $this->getEntityManager();
        $id = $this->getRequest()->getQuery('id');
        $user = $entityManager->find('\User\Entity\User', (int)$id);
		$lang_code = $this->params()->fromRoute('lang');
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
                'bankInfo' => $bankInfo ? $bankInfo->getData():null,
                'resume' => $resume?$resume->getData():null,
                'cvfiles' => $cvfiles,
				"lang_code" => $lang_code,
            ));
        }
    }

    public function newAction(){
        $lang_code = $this->params()->fromRoute('lang');
		return new ViewModel(array(
			"lang_code" => $lang_code,
        ));
    }

    public function editProfileAction(){
        $entityManager = $this->getEntityManager();
        $id = $this->getRequest()->getQuery('id');

        if($id){
            $user = $this->getUserById($id);
        } else {
            $user = $this->getCurrentUser();
        }
        //$user = $entityManager->find('\User\Entity\User', (int)$id);

		$lang_code = $this->params()->fromRoute('lang');
        if($entityManager->find('\User\Entity\Staff', $user->getStaff())){
            return new ViewModel([
                "user" => $user->getData(),
				"lang_code" => $lang_code,
                "isAdmin" => $this->getCurrentUser()->isAdmin(),
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

            $uploadPath = 'uploads' . DIRECTORY_SEPARATOR . $name;

            move_uploaded_file( $tempPath, 'public/'.$uploadPath );
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
        //$queryBuilder = $staffList->createQueryBuilder('staff')
        //    ->where("staff.type in (6,7)");
		//$queryBuilder->leftJoin('staff.client', 'user')->andWhere('user.isActive=1');
        // check search condition
        //$request = $this->getRequest();
        // if($request->getQuery('clientid')){
        //    $client = $this->getCurrentUser();
        //    $queryBuilder->andWhere("staff.client = ?1")
        //        ->setParameter(1, $client);
        // }
		
		$staffList = $entityManager->getRepository('User\Entity\User');
        //->findBy(array('group' => $freelancerGroup));
        $queryBuilder = $staffList->createQueryBuilder('user');
		$queryBuilder->select(array('staff.name','staff.id'));
		$queryBuilder->leftJoin('user.staff', 'staff')->where('staff.type in (6,7)');
		$queryBuilder->andWhere("user.group = 3");
		$queryBuilder->andWhere("user.isActive='1'");
		
        $query = $queryBuilder->getQuery();
        $result = $query->getArrayResult();
        return new JsonModel([
            'pmlist' => $result
        ]);
    }

    public function getSalesListAction() {
        $entityManager = $this->getEntityManager();

        // Get staff group
        //$staffGroup = $entityManager->find('User\Entity\Roles', Roles::SALES_ROLE_ID);
        //$staffList = $entityManager->getRepository('User\Entity\Staff');
        //->findBy(array('group' => $freelancerGroup));
        //$queryBuilder = $staffList->createQueryBuilder('staff')
        //    ->where("staff.type in (4,5)");
		//$queryBuilder->leftJoin('user')->andWhere('user.isActive=1');
        // check search condition
        //$request = $this->getRequest();
        //$client = $this->getCurrentUser();
        // if($request->getQuery('clientid')){
        //    $queryBuilder->andWhere("staff.client = ?1")
        //        ->setParameter(1, $client);
       //  }
		$staffList = $entityManager->getRepository('User\Entity\User');
        //->findBy(array('group' => $freelancerGroup));
        $queryBuilder = $staffList->createQueryBuilder('user');
		$queryBuilder->select(array('staff.name','staff.id' ));
		$queryBuilder->leftJoin('user.staff', 'staff')->where('staff.type in (4,5)');
		$queryBuilder->andWhere("user.group = 3");
		$queryBuilder->andWhere("user.isActive='1'");
		
        $query = $queryBuilder->getQuery();
        $result = $query->getArrayResult();
        return new JsonModel([
            'saleslist' => $result
        ]);
    }
	public function getUserByPmAction() {

		$staffid = $this->getRequest()->getQuery('staffid');
		$entityManager = $this->getEntityManager();
		$user = $entityManager->getRepository('User\Entity\User');
        //->findBy(array('group' => $freelancerGroup));
        $queryBuilder = $user->createQueryBuilder('user');
		$queryBuilder->select(array('user.firstName','user.lastName' ));
		$queryBuilder->leftJoin('user.staff', 'staff')->where('staff.id = '.$staffid);
		$queryBuilder->andWhere("user.group = 3");
		$queryBuilder->andWhere("user.isActive='1'");
		
        $query = $queryBuilder->getQuery();
        $result = $query->getArrayResult();
        return new JsonModel([
            'user_staff' => $result[0]
        ]);
    }
}
