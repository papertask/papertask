<?php
namespace Api\Controller\User;

use Zend\View\Model\JsonModel;

use Application\Controller\AbstractRestfulController;
use User\Entity\User;
use User\Entity\UserGroup;

class ResetPasswordController extends AbstractRestfulController
{
    public function update($id, $data){
		$entityManager = $this->getEntityManager();
		$result = array();

		$user = $this->getUserById($id);
		if($user && ($data['new'] === $data['confirm'])){
			$result['user'] = "User found";
			$valid = $user->checkPassword($data['current']);
			$result['valid?'] = $valid;
			if($valid){
				$result['success'] = $user->resetByOldPass($data['current'], $data['new'], $entityManager);
			}
		}

        return new JsonModel(array('data' => $result));
    }

}
