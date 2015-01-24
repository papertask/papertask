<?php
/**
 */
namespace Api\Controller\User;

use Zend\View\Model\JsonModel;

use Application\Controller\AbstractRestfulController;
use User\Entity\UserEngineeringPriceP;
use Common\Entity\EngineeringCategoryP;
use Common\Entity\Unit;

class EngineeringPricePController extends AbstractRestfulController
{

    public function create($data){
        $entityManager = $this->getEntityManager();
        $user = $this->getUserById($data['userId']);
        unset($data['userId']);

        $engineeringPriceP = new UserEngineeringPriceP();
        $engineeringPriceP->setData([
            'user' => $user,
            'engineeringcategory' => $entityManager->getReference('\Common\Entity\EngineeringCategory', $data['engineeringcategory']['id']),
            'unit' => $entityManager->getReference('\Common\Entity\Unit', $data['unit']['id']),
            'price' => $data['price']
        ]);

        $engineeringPriceP->save($entityManager);

        return new JsonModel([
            'engineeringPriceP' => $engineeringPriceP->getData(),
        ]);
    }
    
    public function getList() 
    {
        $entityManager = $this->getEntityManager();
        $userId = $this->getRequest()->getQuery('userId');
        $user = $entityManager->getRepository('\User\Entity\User')->find( $userId );
        $engineeringPriceP = $entityManager->getRepository('\User\Entity\UserEngineeringPriceP')->findBy(array('user'=>$user));
        $engineeringPricePs = array();
        foreach( $engineeringPriceP as $k => $v ) 
        {
            $engineeringPricePs[$k] = $v->getData();
        }
        return new JsonModel(['engineeringPricePs'=>$engineeringPricePs]);
    }

    public function delete($id){
        $entityManager = $this->getEntityManager();
        $engineeringPriceP = $entityManager->find('\User\Entity\UserEngineeringPriceP', $id);
        $entityManager->remove($engineeringPriceP);
        $entityManager->flush();

        return new JsonModel([]);
    }
    
    public function update( $id, $data ) {
           $entityManager = $this->getEntityManager();
           $user = $this->getUserById($data['userId']);
           unset($data['userId']);
           
           $engineeringPriceP = $entityManager->find('\User\Entity\UserEngineeringPriceP', $id);
           $engineeringPriceP->setData([
               'user' => $user,
               'engineeringcategory' => $entityManager->getReference('\Common\Entity\EngineeringCategory', $data['engineeringCategory']['id']),
               'unit' => $entityManager->getReference('\Common\Entity\Unit', $data['unit']['id']),
               'price' => $data['price']
           ]);
           
           $engineeringPriceP->save($entityManager);
           
           return new JsonModel([
               'engineeringPriceP' => $engineeringPriceP->getData(),
           ]);
       }

}