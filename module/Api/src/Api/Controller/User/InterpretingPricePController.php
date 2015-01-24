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
use User\Entity\UserInterpretingPriceP;

class InterpretingPricePController extends AbstractRestfulController
{

    public function create($data){
        $entityManager = $this->getEntityManager();
        $user = $this->getUserById($data['userId']);
        unset($data['userId']);

        $interpretingPriceP = new UserInterpretingPriceP();
        $interpretingPriceP->setData([
            'user' => $user,
            'priceDay' => $data['priceDay'],
            'priceHalfDay' => $data['priceHalfDay'],
            'sourceLanguage' => $entityManager->getReference('\User\Entity\Language', $data['sourceLanguageId']),
            'targetLanguage' => $entityManager->getReference('\User\Entity\Language', $data['targetLanguageId']),
            'service' => $entityManager->getReference('\User\Entity\InterpretingService', $data['serviceId']),
        ]);

        $interpretingPriceP->save($entityManager);

        return new JsonModel([
            'interpretingPriceP' => $interpretingPriceP->getData(),
        ]);
    }
    
    public function getList()
    {
        $entityManager = $this->getEntityManager();
        $userId = $this->getRequest()->getQuery('userId');
        $user = $this->getUserById( $userId );
        $interpretingPriceP = $entityManager->getRepository('\User\Entity\UserInterpretingPriceP')->findBy(array('user'=>$user));
        $interpretingPricePs = array();
        foreach ( $interpretingPriceP as $k => $v)
        {
            $interpretingPricePs[$k] = $v->getData();
        }
        
        return new JsonModel(['interpretingPricePs'=>$interpretingPricePs]);
    }

    public function delete($id){
        $entityManager = $this->getEntityManager();
        $interpretingPriceP = $entityManager->find('\User\Entity\UserInterpretingPriceP', $id);
        $entityManager->remove($interpretingPriceP);
        $entityManager->flush();

        return new JsonModel([]);
    }

    public function update($id, $data) {
        $entityManager = $this->getEntityManager();
        $user = $this->getUserById($data['userId']);
        unset($data['userId']);
        
        $interpretingPriceP = $entityManager->find('\User\Entity\UserInterpretingPriceP', $id);
        $interpretingPriceP->setData([
                'user' => $user,
                'priceDay' => $data['priceDay'],
                'priceHalfDay' => $data['priceHalfDay'],
                'sourceLanguage' => $entityManager->getReference('\User\Entity\Language', $data['sourceLanguageId']),
                'targetLanguage' => $entityManager->getReference('\User\Entity\Language', $data['targetLanguageId']),
                'service' => $entityManager->getReference('\User\Entity\InterpretingService', $data['serviceId']),
                ]);
        
        $interpretingPriceP->save($entityManager);
        
        return new JsonModel([
            'interpretingPriceP' => $interpretingPriceP->getData(),
        ]);
    }
}