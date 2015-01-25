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
use User\Entity\UserClientDesktop;

class ClientDesktopController extends AbstractRestfulController
{

    public function create($data){
        $entityManager = $this->getEntityManager();
        $client = $this->getUserById($data['userclientId']);
		$freelancer = $this->getUserById($data['userfreelancerId']);
		
        $clientDesktop = new UserClientDesktop();
        $clientDesktop->setData([
            'client' => $client,
			'freelancer' => $freelancer 
        ]);
        $clientDesktop->save($entityManager);

        return new JsonModel([
            'clientDesktop' => $clientDesktop->getClient(),
        ]);
    }
    
    public function getList() 
    {
        $entityManager = $this->getEntityManager();
        $userId = $this->getRequest()->getQuery('userId');
        $user = $entityManager->getRepository('\User\Entity\User')->find( $userId );
        $dtpClient = $entityManager->getRepository('\User\Entity\UserClientDesktop')->findBy(array('freelancer'=>$user));
        $dtpClients = array();
        foreach( $dtpClient as $k => $v ) 
        {
            $dtpClients[$k] = $v->getClient();
        }
        return new JsonModel(['desktopClients'=>$dtpClients]);
    }

    public function delete($id){
        $entityManager = $this->getEntityManager();
        $desktopClient = $entityManager->find('\User\Entity\UserClientDesktop', $id);
        $entityManager->remove($desktopClient);
        $entityManager->flush();

        return new JsonModel([]);
    }
    
    public function update( $id, $data ) {
           $entityManager = $this->getEntityManager();
           $client = $this->getUserById($data['userclientId']);
		   $freelancer = $this->getUserById($data['userfreelancerId']);
           
           $desktopClient = $entityManager->find('\User\Entity\UserClientDesktop', $id);
           $desktopClient->setData([
                'client' => $client,
				'freelancer' => $freelancer 
           ]);
           
           $desktopClient->save($entityManager);
           
           return new JsonModel([
               'desktopClient' => $desktopClient->getData(),
           ]);
       }

}