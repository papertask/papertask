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
use User\Entity\UserTranslationPrice;

class TranslationPriceController extends AbstractRestfulController
{
    public function create($data){
        $entityManager = $this->getEntityManager();
        $user = $this->getUserById($data['userId']);
        unset($data['userId']);

        $translationPrice = new UserTranslationPrice();
        $translationPrice->setData([
            'user' => $user,
            'price' => $data['price'],
            'sourceLanguage' => $entityManager->getReference('\User\Entity\Language', $data['sourceLanguageId']),
            'targetLanguage' => $entityManager->getReference('\User\Entity\Language', $data['targetLanguageId']),
        ]);

        $translationPrice->save($entityManager);

        return new JsonModel([
            'translationPrice' => $translationPrice->getData(),
        ]);
    }
    
    public function getList() 
    {
        $entityManager = $this->getEntityManager();
        $userId = $this->getRequest()->getQuery('userId');
        $user = $entityManager->getRepository('\User\Entity\User')->find( $userId );
        $transPrice = $entityManager->getRepository('\User\Entity\UserTranslationPrice')->findBy(array('user'=>$user));
        $transPrices = array();
        foreach( $transPrice as $k => $v ) 
        {
            $transPrices[$k] = $v->getData();
        }
        return new JsonModel(['translationPrices'=>$transPrices]);
    }

    public function delete($id){
        $entityManager = $this->getEntityManager();
        $translationPrice = $entityManager->find('\User\Entity\UserTranslationPrice', $id);
        $entityManager->remove($translationPrice);
        $entityManager->flush();

        return new JsonModel([]);
    }
    
    public function update( $id, $data) {
        $entityManager = $this->getEntityManager();
        $user = $this->getUserById($data['userId']);
        unset($data['userId']);

        $translationPrice = $entityManager->find('\User\Entity\UserTranslationPrice', $id);
        $translationPrice->setData([
            'user' => $user,
            'price' => $data['price'],
            'sourceLanguage' => $entityManager->getReference('\User\Entity\Language', $data['sourceLanguageId']),
            'targetLanguage' => $entityManager->getReference('\User\Entity\Language', $data['targetLanguageId']),
        ]);

        $translationPrice->save($entityManager);

        return new JsonModel([
            'translationPrice' => $translationPrice->getData(),
        ]);
    }

}