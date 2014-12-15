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

class IndexController extends AbstractRestfulController
{
    public function get($id){
        $user = $this->getUserById($id);
        $userData = $user->getData();

        return new JsonModel([
            'user' => $userData
        ]);
    }

    public function update($id, $data){
        if(isset($data['password']) && strlen($data['password']) > 5){
            $user = $this->getUserById((int)$id);
            $user->encodePassword($data['password']);
            $user->save($this->getEntityManager());

            return new JsonModel(['success' => 1]);
        }
        $data['country'] = $this->getEntityManager()->find('\User\Entity\Country', (int)$data['country']['id']);

        $data['profileUpdated'] = true;
        $user = $this->getCurrentUser();
        $user->updateData($data);

        $entityManager = $this->getEntityManager();
        $user->save($entityManager);

        return new JsonModel([]);
    }
}