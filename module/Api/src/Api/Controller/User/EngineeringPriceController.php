<?php
/**
 */
namespace Api\Controller\User;

use Zend\View\Model\JsonModel;

use Application\Controller\AbstractRestfulController;
use User\Entity\UserEngineeringPrice;
use Common\Entity\EngineeringCategory;
use Common\Entity\Unit;

class EngineeringPriceController extends AbstractRestfulController
{

    public function create($data){
        $entityManager = $this->getEntityManager();
        $user = $this->getUserById($data['userId']);
        unset($data['userId']);

        $engineeringPrice = new UserEngineeringPrice();
        $engineeringPrice->setData([
            'user' => $user,
            'engineeringcategory' => $entityManager->getReference('\Common\Entity\EngineeringCategory', $data['engineeringCategory']['id']),
            'unit' => $entityManager->getReference('\Common\Entity\Unit', $data['unit']['id']),
            'price' => $data['price']
        ]);

        $engineeringPrice->save($entityManager);

        return new JsonModel([
            'engineeringPrice' => $engineeringPrice->getData(),
        ]);
    }
    
    public function getList() 
    {
        $entityManager = $this->getEntityManager();
        $userId = $this->getRequest()->getQuery('userId');
        $user = $entityManager->getRepository('\User\Entity\User')->find( $userId );
        $engineeringPrice = $entityManager->getRepository('\User\Entity\UserEngineeringPrice')->findBy(array('user'=>$user));
        $engineeringPrices = array();
        foreach( $engineeringPrice as $k => $v ) 
        {
            $engineeringPrices[$k] = $v->getData();
        }
        return new JsonModel(['engineeringPrices'=>$engineeringPrices]);
    }

    public function delete($id){
        $entityManager = $this->getEntityManager();
        $engineeringPrice = $entityManager->find('\User\Entity\UserEngineeringPrice', $id);
        $entityManager->remove($engineeringPrice);
        $entityManager->flush();

        return new JsonModel([]);
    }
    
    public function update( $id, $data ) {
           $entityManager = $this->getEntityManager();
           $user = $this->getUserById($data['userId']);
           unset($data['userId']);
           
           $engineeringPrice = $entityManager->find('\User\Entity\UserEngineeringPrice', $id);
           $engineeringPrice->setData([
               'user' => $user,
               'engineeringcategory' => $entityManager->getReference('\Common\Entity\EngineeringCategory', $data['engineeringCategory']['id']),
               'unit' => $entityManager->getReference('\Common\Entity\Unit', $data['unit']['id']),
               'price' => $data['price']
           ]);
           
           $engineeringPrice->save($entityManager);
           
           return new JsonModel([
               'engineeringPrice' => $engineeringPrice->getData(),
           ]);
       }

}