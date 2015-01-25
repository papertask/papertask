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
use User\Entity\UserClientInterpreting;

class ClientInterpretingController extends AbstractRestfulController
{

    public function create($data){
        $entityManager = $this->getEntityManager();
        $client = $this->getUserById($data['userclientId']);
		$freelancer = $this->getUserById($data['userfreelancerId']);

        $clientInterpreting = new UserClientInterpreting();
        $clientInterpreting->setData([
            'client' => $client,
			'freelancer' => $freelancer 
        ]);
        $clientInterpreting->save($entityManager);

        return new JsonModel([
            'clientInterpreting' => $clientInterpreting->getClient(),
        ]);
    }
    
    public function getList() 
    {
        $entityManager = $this->getEntityManager();
        $userId = $this->getRequest()->getQuery('userId');
        $user = $entityManager->getRepository('\User\Entity\User')->find( $userId );
        $interpretingClient = $entityManager->getRepository('\User\Entity\UserClientInterpreting')->findBy(array('freelancer'=>$user));
        $interpretingClients = array();
        foreach( $interpretingClient as $k => $v ) 
        {
			
            $interpretingClients[$k] = $v->getClient();
        }
        return new JsonModel(['interpretingClients'=>$interpretingClients]);
    }

    public function delete($id){
        $entityManager = $this->getEntityManager();
        $interpretingClient = $entityManager->find('\User\Entity\UserClientInterpreting', $id);
        $entityManager->remove($interpretingClient);
        $entityManager->flush();

        return new JsonModel([]);
    }
    
    public function update( $id, $data ) {
           $entityManager = $this->getEntityManager();
			$client = $this->getUserById($data['userclientId']);
			$freelancer = $this->getUserById($data['userfreelancerId']);
           //unset($data['userId']);
           
           $interpretingClient = $entityManager->find('\User\Entity\UserClientInterpreting', $id);
           $interpretingClient->setData([
                'client' => $client,
				'freelancer' => $freelancer 
           ]);
           
           $interpretingClient->save($entityManager);
           
           return new JsonModel([
               'interpretingClient' => $interpretingClient->getData(),
           ]);
       }

}