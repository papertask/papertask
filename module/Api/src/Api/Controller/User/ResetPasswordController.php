<?php
namespace Api\Controller\User;

use Zend\View\Model\JsonModel;

use Application\Controller\AbstractRestfulController;
use User\Entity\User;
use User\Entity\UserGroup;

class ResetPasswordController extends AbstractRestfulController
{
    public function update($id, $data){
        // $userId = $this->getRequest()->getQuery('user_id');
        // $entityManager = $this->getEntityManager();
        // $user = $this->getUserById($userId);
        // $employer = $user->getEmployer();
        // $employer->updateData(array(
        //         'position'=>isset($data['position'])?$data['position']:'',
        //         'company'=>$entityManager->getRepository('User\Entity\Company')->findOneBy(array('id' => $data['company'])),
        //         'defaultServiceLevel'=>$data['defaultServiceLevel'],
        //         'comments'=>$data['comments'],
        //         'name' => $data['username'],
        //         'contracted' => $data['contracted'],
        //         'pm' => $entityManager->getRepository('User\Entity\Staff')->findOneBy(array('id' => $data['pm']['id'])),
        //         'sales' => $entityManager->getRepository('User\Entity\Staff')->findOneBy(array('id' => $data['sales']['id']))
        //     ));
        // $employer->save($entityManager);

		var_dump("Im here! form/reset");
		$data = $this->getData();
		$curr = $data['current'];
		if($data['new'] == $data['confirm']){
			$entityManager = $controller->getEntityManager();
			$user = $controller->getUser(array('token' => $token));
			if($user){
				$user->reset($token, $data['new'], $entityManager);
			}
			//return false;
		}

        return new JsonModel([]);
    }

}
