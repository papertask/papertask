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
use User\Entity\UserDesktopPrice;

class DesktopPriceController extends AbstractRestfulController
{

    public function create($data){
        $entityManager = $this->getEntityManager();
        $user = $this->getUserById($data['userId']);
        unset($data['userId']);

        $desktopPrice = new UserDesktopPrice();
        $desktopPrice->setData([
            'user' => $user,
            'language' => $entityManager->getReference('\User\Entity\Language', $data['languageId']),
            'software' => $entityManager->getReference('\User\Entity\DesktopSoftware', $data['softwareId']),
            'priceMac' => $data['priceMac'],
            'pricePc' => $data['pricePc'],
            'priceHourMac' => $data['priceHourMac'],
            'priceHourPc' => $data['priceHourPc']
        ]);

        $desktopPrice->save($entityManager);

        return new JsonModel([
            'desktopPrice' => $desktopPrice->getData(),
        ]);
    }
    
    public function getList() 
    {
        $entityManager = $this->getEntityManager();
        $userId = $this->getRequest()->getQuery('userId');
        $user = $entityManager->getRepository('\User\Entity\User')->find( $userId );
        $dtpPrice = $entityManager->getRepository('\User\Entity\UserDesktopPrice')->findBy(array('user'=>$user));
        $dtpPrices = array();
        foreach( $dtpPrice as $k => $v ) 
        {
            $dtpPrices[$k] = $v->getData();
        }
        return new JsonModel(['desktopPrices'=>$dtpPrices]);
    }

    public function delete($id){
        $entityManager = $this->getEntityManager();
        $desktopPrice = $entityManager->find('\User\Entity\UserDesktopPrice', $id);
        $entityManager->remove($desktopPrice);
        $entityManager->flush();

        return new JsonModel([]);
    }
    
    public function update( $id, $data ) {
           $entityManager = $this->getEntityManager();
           $user = $this->getUserById($data['userId']);
           unset($data['userId']);
           
           $desktopPrice = $entityManager->find('\User\Entity\UserDesktopPrice', $id);
           $desktopPrice->setData([
               'user' => $user,
               'language' => $entityManager->getReference('\User\Entity\Language', $data['languageId']),
               'software' => $entityManager->getReference('\User\Entity\DesktopSoftware', $data['softwareId']),
               'priceMac' => $data['priceMac'],
               'pricePc' => $data['pricePc'],
               'priceHourMac' => $data['priceHourMac'],
               'priceHourPc' => $data['priceHourPc']
           ]);
           
           $desktopPrice->save($entityManager);
           
           return new JsonModel([
               'desktopPrice' => $desktopPrice->getData(),
           ]);
       }

}