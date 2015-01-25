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
use User\Entity\UserClientTranslation;

class ClientTranslationController extends AbstractRestfulController
{

    public function create($data){
        $entityManager = $this->getEntityManager();
        $client = $this->getUserById($data['userclientId']);
		$freelancer = $this->getUserById($data['userfreelancerId']);

        $clientTranslation = new UserClientTranslation();
        $clientTranslation->setData([
            'client' => $client,
			'freelancer' => $freelancer 
        ]);
        $clientTranslation->save($entityManager);

        return new JsonModel([
            'clientTranslation' => $clientTranslation->getClient(),
        ]);
    }
    
    public function getList() 
    {
		error_reporting(E_ALL);
		ini_set('display_errors', 1);
        $entityManager = $this->getEntityManager();
        $userId = $this->getRequest()->getQuery('userId');
        $user = $entityManager->getRepository('\User\Entity\User')->find( $userId );
        $transClient = $entityManager->getRepository('\User\Entity\UserClientTranslation')->findBy(array('freelancer'=>$user));
        $transClients = array();
        foreach( $transClient as $k => $v ) 
        {
			
            $transClients[$k] = $v->getClient();
        }
        return new JsonModel(['transClients'=>$transClients]);
    }

    public function delete($id){
        $entityManager = $this->getEntityManager();
        $transClient = $entityManager->find('\User\Entity\UserClientTranslation', $id);
        $entityManager->remove($transClient);
        $entityManager->flush();

        return new JsonModel([]);
    }
    
    public function update( $id, $data ) {
           $entityManager = $this->getEntityManager();
			$client = $this->getUserById($data['userclientId']);
			$freelancer = $this->getUserById($data['userfreelancerId']);
           //unset($data['userId']);
           
           $transClient = $entityManager->find('\User\Entity\UserClientTranslation', $id);
           $transClient->setData([
                'client' => $client,
				'freelancer' => $freelancer 
           ]);
           
           $transClient->save($entityManager);
           
           return new JsonModel([
               'transClient' => $transClient->getData(),
           ]);
       }

}