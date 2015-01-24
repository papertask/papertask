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
use User\Entity\UserTranslationPriceP;

class TranslationPricePController extends AbstractRestfulController
{
    public function create($data){
        $entityManager = $this->getEntityManager();
        $user = $this->getUserById($data['userId']);
        unset($data['userId']);

        $translationPriceP = new UserTranslationPriceP();
        $translationPriceP->setData([
            'user' => $user,
            'price' => $data['price'],
            'sourceLanguage' => $entityManager->getReference('\User\Entity\Language', $data['sourceLanguageId']),
            'targetLanguage' => $entityManager->getReference('\User\Entity\Language', $data['targetLanguageId']),
        ]);

        $translationPriceP->save($entityManager);

        return new JsonModel([
            'translationPriceP' => $translationPriceP->getData(),
        ]);
    }
    
    public function getList() 
    {
        $entityManager = $this->getEntityManager();
        $userId = $this->getRequest()->getQuery('userId');
        $user = $entityManager->getRepository('\User\Entity\User')->find( $userId );
        $transPrice = $entityManager->getRepository('\User\Entity\UserTranslationPriceP')->findBy(array('user'=>$user));
        $transPrices = array();
        foreach( $transPrice as $k => $v ) 
        {
            $transPrices[$k] = $v->getData();
        }
        return new JsonModel(['translationPricePs'=>$transPrices]);
    }

    public function delete($id){
        $entityManager = $this->getEntityManager();
        $translationPriceP = $entityManager->find('\User\Entity\UserTranslationPriceP', $id);
        $entityManager->remove($translationPriceP);
        $entityManager->flush();

        return new JsonModel([]);
    }
    
    public function update( $id, $data) {
        $entityManager = $this->getEntityManager();
        $user = $this->getUserById($data['userId']);
        unset($data['userId']);

        $translationPriceP = $entityManager->find('\User\Entity\UserTranslationPriceP', $id);
        $translationPriceP->setData([
            'user' => $user,
            'price' => $data['price'],
            'sourceLanguage' => $entityManager->getReference('\User\Entity\Language', $data['sourceLanguageId']),
            'targetLanguage' => $entityManager->getReference('\User\Entity\Language', $data['targetLanguageId']),
        ]);

        $translationPriceP->save($entityManager);

        return new JsonModel([
            'translationPriceP' => $translationPriceP->getData(),
        ]);
    }

}