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
        
        // Pool
        if($user->isEmployer()){
        	$userData['translator_pool'] = $user->getTranslatorPool($this);
        }
        
        if($user->isFreelancer()){
        	$userData['client_pool'] = $user->getClientPool($this);
        }
        
        $userData['isAdmin'] = $this->getCurrentUser()->isAdmin();
		
		//var_dump($userData);exit;

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
		//personal
		$desktopPricePData = $this->getAllDataBy('\User\Entity\UserDesktopPriceP', [
            'user' => $user,
        ]);
        $interpretingPricePData = $this->getAllDataBy('\User\Entity\UserInterpretingPriceP', [
            'user' => $user,
        ]);
        $translationPricePData = $this->getAllDataBy('\User\Entity\UserTranslationPriceP', [
            'user' => $user,
        ]);
        $engineeringPircePData = $this->getAllDataBy('\User\Entity\UserEngineeringPriceP', [
            'user' => $user,
        ]);
		
        $entityManager = $this->getEntityManager();
        $repository = $entityManager->getRepository('User\Entity\UserTmRatio');
        $tmRatio = $repository->findOneBy(array('user'=>$user));
        
        return new JsonModel([
            'user'               => $userData,
            'desktopPrices'      => $desktopPriceData,
            'interpretingPrices' => $interpretingPriceData,
            'translationPrices'  => $translationPriceData,
            'engineeringPrices'  => $engineeringPirceData,
			
			'desktopPricesP'      => $desktopPricePData,
            'interpretingPricesP' => $interpretingPricePData,
            'translationPricesP'  => $translationPricePData,
            'engineeringPricesP'  => $engineeringPircePData,
			
            'tmRatios'           => isset($tmRatio)?$tmRatio->getData():null
        ]);
    }

    public function update($id, $data){
		//error_reporting(E_ALL);
		//ini_set('display_errors', 1);
        if(isset($data['password']) && strlen($data['password']) > 5){
			$user = $this->getUserById((int)$id);
            $user->encodePassword($data['password']);
            $user->save($this->getEntityManager());
			$user->sendResetPasswordEmail($this,$user,$data['password']);	
            return new JsonModel(['success' => 1]);
        }
        $data['country'] = $this->getEntityManager()->find('\User\Entity\Country', (int)$data['country']['id']);

        $data['profileUpdated'] = true;
        // $user = $this->getCurrentUser();
        $user = $this->getUserById( (int) $id );
        $user->updateData($data);

        $entityManager = $this->getEntityManager();
        $user->save($entityManager);

        return new JsonModel([]);
    }
}