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

        $desktopPriceData = $this->getAllDataBy('\User\Entity\UserDesktopPrice', [
            'user' => $user,
        ]);
        $interpretingPriceData = $this->getAllDataBy('\User\Entity\UserInterpretingPrice', [
            'user' => $user,
        ]);
        $translationPriceData = $this->getAllDataBy('\User\Entity\UserTranslationPrice', [
            'user' => $user,
        ]);
        $engineeringPirceData = $this->getAllDataBy('\User\Entity\UserEngineeringPrice', [
        	'user' => $user,
        ]);
        $entityManager = $this->getEntityManager();
        $repository = $entityManager->getRepository('User\Entity\UserTmRatio');
        $tmRatio = $repository->findOneBy(array('user'=>$user));

        return new JsonModel([
            'user' => $userData,
        	'employer' => $user->getEmployer()->getData(),
            'desktopPrices' => $desktopPriceData,
            'interpretingPrices' => $interpretingPriceData,
            'translationPrices' => $translationPriceData,
        	'engineeringPrices' => $engineeringPirceData,
        	'tmRatios'			=> $tmRatio?$tmRatio->getData():null
        ]);
    }

    public function update($id, $data){
        $data['country'] = $data['country']['select'];

        $data['profileUpdated'] = true;
        $user = $this->getUserById($id);
        $user->updateData($data);

        $entityManager = $this->getEntityManager();
        $user->save($entityManager);
        
        return new JsonModel([]);
    }
}