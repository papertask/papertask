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
use DoctrineORMModule\Paginator\Adapter\DoctrinePaginator as DoctrineAdapter;
use Doctrine\ORM\Tools\Pagination\Paginator as ORMPaginator;
use Zend\Paginator\Paginator;
use User\Entity\UserGroup;
use User\Entity\User;
use Admin\Model\Helper;
use User\Entity\UserDesktopPrice;
use User\Entity\UserTranslationPrice;
use User\Entity\UserInterpretingPrice;
use Doctrine\Common\Collections\Criteria;
use User\Entity\CvFile;

class FreelancerController extends AbstractRestfulController
{
	public function create( $pdata ) {
		$data = array();
		$data['isActive'] = $pdata['isActive'];
		$data['profileUpdated'] = $pdata['profileUpdated'];
		$data['city'] = $pdata['city'];
		
		$data['currency'] = $pdata['currency'];
		$data['createdTime'] = new \DateTime('now');
        $data['lastLogin'] = new \DateTime('now');
		$data['email'] = $pdata['email'];
		$data['firstName'] = $pdata['firstname'];
		$data['lastName'] = $pdata['lastname'];
		$data['password'] = $pdata['password'];
		$data['phone'] = $pdata['phone'];
		$data['gender'] = $pdata['gender'];
		$entityManager = $this->getEntityManager();
		$data['country'] = $entityManager->getRepository('User\Entity\Country')->findOneBy(array('id' => $pdata['country']));;
		$userExist = $entityManager->getRepository('User\Entity\User')->findOneBy(array('email'=>$pdata['email']));
		if ( $userExist ) {
            return new JsonModel(['success'=>'failed', 'msg'=>'']);
		} else {
			$user = new User();
            $user->setData( $data );
            $user->save($entityManager);
			$user->createFreelancer( $this, $data, $entityManager);
			
			$freelancer = $user->getFreelancer();
	        $tmp = array('Resources'=>$pdata['resources'], 'DesktopCatTools'=>$pdata['desktopcattools'], 'DesktopOperatingSystems'=>$pdata['desktopoperatingsystems'], 'InterpretingSpecialisms'=>$pdata['interpretingspecialisms'], 'TranslationCatTools'=>$pdata['translationcattools'], 'TranslationSpecialisms'=>$pdata['translationspecialisms']);
			$freelancer->updateData($tmp, $entityManager);
			$freelancer->save($entityManager);
			$ret_data = $user->getData();
           
			// Set Translation Price
			$pTranslationPrice = new UserTranslationPrice();
			foreach ( $pdata['translationPrices'] as $k => $v ) {
				$translationPrice = array(
						'user' => $user,
						'sourceLanguage' => $entityManager->getRepository('User\Entity\Language')->findOneBy(array('id' => $v['sourceLanguage']['id'])),
						'targetLanguage' => $entityManager->getRepository('User\Entity\Language')->findOneBy(array('id' => $v['targetLanguage']['id'])),
						'price' => $v['price']
				);
				 
				$pTranslationPrice->setData( $translationPrice );
				$pTranslationPrice->save( $entityManager );
			}
	
			// Set Desktop Prices
			$pDesktopPrice = new UserDesktopPrice();
			foreach ( $pdata['desktopPrices'] as $k => $v) {
				
                $desktopPrice = array (
						'user'=> $user,
						'language' => $entityManager->getRepository('User\Entity\Language')->findOneBy(array('id'=>$v['language']['id'])),
						'software' => $entityManager->getRepository('User\Entity\DesktopSoftware')->findOneBy(array('id'=>$v['language']['id'])),
						'priceMac' => $v['priceMac'],
						'pricePc' => $v['pricePc'],
						'priceHourMac' => $v['priceHourMac'],
						'priceHourPc' => $v['priceHourPc']
				);
				 
				$pDesktopPrice->setData( $desktopPrice );
				$pDesktopPrice->save( $entityManager );
			}
	
			// Set Interpreting Price
			$pInterpretingPrice = new UserInterpretingPrice();
			foreach ( $pdata['interpretingPrices'] as $k=>$v) {
				$interpretingPrice = array(
						'user' => $user,
						'sourceLanguage' => $entityManager->getRepository('User\Entity\Language')->findOneBy(array('id' => $v['sourceLanguage']['id'])),
						'targetLanguage' => $entityManager->getRepository('User\Entity\Language')->findOneBy(array('id' => $v['targetLanguage']['id'])),
						'service' => $entityManager->getRepository('User\Entity\InterpretingService')->findOneBy(array('id' => $v['service']['id'])),
						'priceDay' => $v['priceDay'],
						'priceHalfDay' => $v['priceHalfDay']
				);
				$pInterpretingPrice->setData( $interpretingPrice );
				$pInterpretingPrice->save( $entityManager );
			}
			return new JsonModel(['user'=>$ret_data, 'success'=>'success']);
		}
		return new JsonModel(['success'=>'failed', 'msg'=>'Unknown Error']);
	}
	
    public function get($id){
		$user = $this->getUserById($id);
        $freelancerData = $user->getFreelancer()->getData();
        return new JsonModel([
            'freelancer' => $freelancerData,
        ]);
    }

    public function update($id, $data){
		//
        $userId = $this->getEvent()->getRouteMatch()->getParam('user_id');
        $entityManager = $this->getEntityManager();
        $user = $this->getUserById($userId);
        $freelancer = $user->getFreelancer();
		
        $freelancer->updateData($data, $entityManager);
		$freelancer->updateSenior($data, $entityManager);
		
        $freelancer->save($entityManager);
        return new JsonModel([]);
    }

    public function getList(){
        $entityManager = $this->getEntityManager();

        // Get freelancer group
        $freelancerGroup = $entityManager->find('User\Entity\UserGroup', UserGroup::FREELANCER_GROUP_ID);

		$freelancerList = $entityManager->getRepository('User\Entity\User');
                                //->findBy(array('group' => $freelancerGroup));
        $queryBuilder = $freelancerList->createQueryBuilder('user')
			->innerJoin("user.freelancer f")
            ->where("user.group = :group1")->setParameter('group1', $freelancerGroup);

        // check search condition
        $request = $this->getRequest();
        if($request->getQuery('search')){
            // search by name
            if($request->getQuery('name')){
                $arrayName = explode(' ', $request->getQuery('name'));
                if(count($arrayName) != 2){
                    $queryBuilder->andWhere("user.firstName like :name1 OR user.lastName like :name1")
                        ->setParameter('name1', '%' . $request->getQuery('name') . '%');
                }else{
                    $queryBuilder->andWhere("(user.firstName like :name1 AND user.lastName like :name2)
                                        OR (user.lastName like :name1 AND user.firstName like :name2)")
                        ->setParameter('name1', '%' . $arrayName[0] . '%')
                        ->setParameter('name2', '%' . $arrayName[1] . '%');
                }
            }

            // search by id
            if($request->getQuery('idFreelancer')){
                $queryBuilder->andWhere("user.id = ?1")
                    ->setParameter(1, (int)$request->getQuery('idFreelancer'));
            }
			
			// search by mail
            if($request->getQuery('email')){
                $queryBuilder->andWhere("user.email like :email1")
                    ->setParameter('email1', '%' . $request->getQuery('email') . '%');
            }

            // search by country aa
            if($request->getQuery('country')){
                $queryBuilder->andWhere("user.country = :counttry1")
                    ->setParameter('counttry1', $request->getQuery('country'));
            }

            // search include inactive
            if(!$request->getQuery('includeInactive')){
                $queryBuilder->andWhere("user.isActive = ?1")
                    ->setParameter(1, 1);
            }
			// search Senior account
            if($request->getQuery('senior')){
                $queryBuilder->andWhere("f.isSenior = ?1")
                    ->setParameter(1, 1);
            }
			// search source
			if($source = $this->params()->fromQuery('source')){
                $queryBuilder->innerJoin("f.Resources r")
							->andWhere("r.id = ?1 ")
                    ->setParameter(1, $source);
            }
			// search rating
			if($rate = $this->params()->fromQuery('rate')){
                $queryBuilder->innerJoin("f.Rating ra")
							->andWhere("ra.id = ?1 ")
                    ->setParameter(1, $rate);
            }
			//search specialism
			if($specialism = $this->params()->fromQuery('specialism')){
                $queryBuilder->innerJoin("f.InterpretingSpecialisms i")
							->andWhere("i.id = ?1")
							->innerJoin("f.TranslationSpecialisms t")
							->orWhere("t.id = ?1")
							->setParameter(1, $specialism);
            }
			
        }
		
        $queryBuilder->orderBy('user.createdTime', 'ASC');
        $adapter = new DoctrineAdapter(new ORMPaginator($queryBuilder));
        $paginator = new Paginator($adapter);
        $paginator->setDefaultItemCountPerPage(10);
		
		$page = (int)$this->getRequest()->getQuery('page');
        if($page) $paginator->setCurrentPageNumber($page);
        $data = array();
        $helper = new Helper();
        if(count($paginator) > 0){
            foreach($paginator as $user){
                $userData = $user->getData();
                $userData['createdTime'] = $helper->formatDate($userData['createdTime']);
                $data[] = $userData;
            }
            return new JsonModel(array(
                'freelancerList' => $data,
                'pages' => $paginator->getPages()
            ));
        }
        return new JsonModel([
            'freelancerList' => []
        ]);
    }

    public function delete($id){
        $entityManager = $this->getEntityManager();
        $user = $entityManager->find('\User\Entity\User', (int)$id);
        $entityManager->remove($user);
        $entityManager->flush();

        return new JsonModel([]);
    }
}