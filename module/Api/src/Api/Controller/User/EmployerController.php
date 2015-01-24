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
use Zend\Paginator\Paginator as ZendPaginator;
use User\Entity\User; 
use User\Entity\UserGroup;
use Admin\Model\Helper;
use User\Entity\UserDesktopPrice;
use User\Entity\UserTranslationPrice;
use User\Entity\UserInterpretingPrice;
use User\Entity\UserTmRatio;
use User\Entity\UserEngineeringPrice;
use User\Entity\Company;

class EmployerController extends AbstractRestfulController
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
		$data['lastName'] = $pdata['surname'];
		$data['password'] = $pdata['password'];
		$data['phone'] = $pdata['phone'];
        $data['cellphone'] = $pdata['cellphone'];
		$data['gender'] = $pdata['gender'];
		$data['comments'] = $pdata['comments'];
		$data['position'] = $pdata['position'];
        $data['contracted'] = $pdata['contracted'];
        $data['name'] = $pdata['name'];
		$entityManager = $this->getEntityManager();
		$data['company_id'] = $entityManager->getRepository('User\Entity\Company')->findOneBy(array('id' => $pdata['company']));
        $data['country'] = $entityManager->getRepository('User\Entity\Country')->findOneBy(array('id' => $pdata['country']));
        $data['pm'] = $entityManager->getRepository('User\Entity\Staff')->findOneBy(array('id' => $pdata['pm']['id']));
        $data['sales'] = $entityManager->getRepository('User\Entity\Staff')->findOneBy(array('id' => $pdata['sales']['id']));
		$userExist = $entityManager->getRepository('User\Entity\User')->findOneBy(array('email'=>$pdata['email']));
		 
		if ( $userExist ) {
            return new JsonModel(['success'=>'failed', 'msg'=>'']);
		} else {
			$user = new User();
            $user->setData( $data );
            $user->save($entityManager);
			$user->createEmployer( $this, $data, $entityManager);
			$employer = $user->getEmployer();
			$employer->updateData(array(
                'position'=>$pdata['position'],
                'company'=>$data['company_id'],
                'defaultServiceLevel'=>$pdata['defaultServiceLevel'],
                'comments'=>$pdata['comments'],
                'contracted'=> $pdata['contracted'],
                'pm' => $data['pm'] ,
                'name' => $pdata['name'],
                'sales' => $data['sales']));
			$employer->save($entityManager);
	
			$ret_data = $user->getData();

			// Set Translation Price
			foreach ( $pdata['translationPrices'] as $k => $v ) {
				$translationPrice = array(
						'user' => $user,
						'sourceLanguage' => $entityManager->getRepository('User\Entity\Language')->findOneBy(array('id' => $v['sourceLanguage']['id'])),
						'targetLanguage' => $entityManager->getRepository('User\Entity\Language')->findOneBy(array('id' => $v['targetLanguage']['id'])),
						'price' => $v['price']
				);
				$pTranslationPrice = new UserTranslationPrice();
				$pTranslationPrice->setData( $translationPrice );
				$pTranslationPrice->save( $entityManager );
			}
	
			// Set Desktop Prices
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
				$pDesktopPrice = new UserDesktopPrice();
				$pDesktopPrice->setData( $desktopPrice );
				$pDesktopPrice->save( $entityManager );
			}
	
			// Set Interpreting Price
			foreach ( $pdata['interpretingPrices'] as $k=>$v) {
				$interpretingPrice = array(
						'user' => $user,
						'sourceLanguage' => $entityManager->getRepository('User\Entity\Language')->findOneBy(array('id' => $v['sourceLanguage']['id'])),
						'targetLanguage' => $entityManager->getRepository('User\Entity\Language')->findOneBy(array('id' => $v['targetLanguage']['id'])),
						'service' => $entityManager->getRepository('User\Entity\InterpretingService')->findOneBy(array('id' => $v['service']['id'])),
						'priceDay' => $v['priceDay'],
						'priceHalfDay' => $v['priceHalfDay']
				);
				$pInterpretingPrice = new UserInterpretingPrice();
				$pInterpretingPrice->setData( $interpretingPrice );
				$pInterpretingPrice->save( $entityManager );
			}
	
			// Set TM Ratio
			$pTmRatio = new UserTmRatio();
			$tmRatio = array(
					'repetitions'    => $pdata['tmRatio']['repetitions'],
					'yibai'            => $pdata['tmRatio']['yibai'],
					'jiuwu'            => $pdata['tmRatio']['jiuwu'],
					'bawu'            => $pdata['tmRatio']['bawu'],
					'qiwu'            => $pdata['tmRatio']['qiwu'],
					'wushi'            => $pdata['tmRatio']['wushi'],
					'nomatch'        => $pdata['tmRatio']['nomatch'],
					'user'            => $user
			);
			 
			$pTmRatio->setData( $tmRatio );
			$pTmRatio->save( $entityManager );
	
			// Set Engineering Price
			foreach ( $pdata['engineeringPrices'] as $k=>$v ) {
				$engineeringPrice = array(
						'engineeringcategory'=> $entityManager->getRepository('Common\Entity\EngineeringCategory')->findOneBy(array('id' => $v['engineeringCategory']['id'])),
						'unit'=> $entityManager->getRepository('Common\Entity\Unit')->findOneBy(array('id' => $v['unit']['id'])),
						'price'=> $v['price'],
						'user'=> $user
				);
				$pEngineeringPrices = new UserEngineeringPrice();
				$pEngineeringPrices->setData( $engineeringPrice );
				$pEngineeringPrices->save( $entityManager );
			}
	
			return new JsonModel(['user'=>$ret_data, 'success'=>'success']);
		}
	}
	
    public function get($id){
        $user = $this->getUserById($id);
        $employerData = $user->getEmployer()->getData();

        return new JsonModel([
            'employer' => $employerData,
        ]);
    }
    
    public function update($id, $data){
        $userId = $this->getRequest()->getQuery('user_id');
        $entityManager = $this->getEntityManager();
        $user = $this->getUserById($userId);
        $employer = $user->getEmployer();
        $employer->updateData(array(
                'position'=>isset($data['position'])?$data['position']:'', 
                'company'=>$entityManager->getRepository('User\Entity\Company')->findOneBy(array('id' => $data['company'])), 
                'defaultServiceLevel'=>$data['defaultServiceLevel'],
                'comments'=>$data['comments'],
                'name' => $data['username'],
                'contracted' => $data['contracted'],
                'pm' => $entityManager->getRepository('User\Entity\Staff')->findOneBy(array('id' => $data['pm']['id'])),
                'sales' => $entityManager->getRepository('User\Entity\Staff')->findOneBy(array('id' => $data['sales']['id']))
            ));
        $employer->save($entityManager);

        return new JsonModel([]);
    }
    
    public function delete($id) {
        $userId = $this->getEvent()->getRouteMatch()->getParam('id');
        $entityManager = $this->getEntityManager();
        
        $user = $this->getUserById($userId);
        
        $employer = $user->getEmployer();
        
        // Remove Interpreting Price
        $repository = $entityManager->getRepository('User\Entity\UserInterpretingPrice');
        $interPretingPrices = $repository->findBy( array('user'=>$user) );
        foreach ($interPretingPrices as $k=>$v) {
            $interPretingPrice = $repository->find($v->getId());
            $entityManager->remove($interPretingPrice);
            $entityManager->flush();
        }
        
        // Remove EngeeringPrice
        $repository = $entityManager->getRepository('User\Entity\UserEngineeringPrice');
        $engineeringPrices = $repository->findBy(array('user'=>$user));
        foreach ($engineeringPrices as $k=>$v) {
            $engineeringPrice = $repository->find($v->getId());
            $entityManager->remove($engineeringPrice);
            $entityManager->flush();
        }
        
        // Remove Translation Price
        $repository = $entityManager->getRepository('User\Entity\UserTranslationPrice');
        $translationPrices = $repository->findBy(array('user'=>$user));
        foreach ($translationPrices as $k=>$v) {
            $translationPrice = $repository->find($v->getId());
            $entityManager->remove($translationPrice);
            $entityManager->flush();
        }
        
        // Remove DesktopPrices
        $repository = $entityManager->getRepository('User\Entity\UserDesktopPrice');
        $dtpPrices = $repository->findBy(array('user'=>$user));
        foreach ($dtpPrices as $k=>$v) {
            $dtpPrice = $repository->find($v->getId());
            $entityManager->remove($dtpPrice);
            $entityManager->flush();
        }
        
        // Remove Translation Ratio
        $repository = $entityManager->getRepository('User\Entity\UserTmRatio');
        $tmRatios = $repository->findBy(array('user'=>$user));
        foreach ($tmRatios as $k=>$v) {
            $tmRatio = $repository->find($v->getId());
            $entityManager->remove($tmRatio);
            $entityManager->flush();
        }
        $entityManager->remove($user);
        $entityManager->flush();
        $entityManager->remove($employer);
        $entityManager->flush();
        return new JsonModel([]);
    }
    
    public function getList( ) {
        $entityManager = $this->getEntityManager();
        
        $employerGroup = $entityManager->find('User\Entity\UserGroup', UserGroup::EMPLOYER_GROUP_ID);
        $employerList = $entityManager->getRepository('User\Entity\User');
        $queryBuilder = $employerList->createQueryBuilder('user');
        $request = $this->getRequest();
		
        if($request->getQuery('search') && $request->getQuery('company')){
            $company = $entityManager->getRepository('User\Entity\Company')->findBy(array('id'=>$request->getQuery('company')));
            $queryBuilder->leftJoin('user.employer', 'employer')->where('employer.company=?1')->setParameter(1, $company);
            $queryBuilder->andWhere("user.group=?2")->setParameter(2, $employerGroup);
        } else {
            $queryBuilder->where("user.group=?1")->setParameter(1, $employerGroup);
        }

        if($request->getQuery('search')){
            if($arrayNames = $this->params()->fromQuery('name')){
                $arrayName = explode(' ', $arrayNames);
                if(count($arrayName) != 2){
                    $queryBuilder->andWhere(
                        $queryBuilder->expr()->like('user.firstName', "'%". $arrayName[0] . "%'"));
                    
                } else {
                    $queryBuilder->andWhere(
                        $queryBuilder->expr()->like('user.firstName', "'%". $arrayName[0] . "%'"));
                    $queryBuilder->andWhere(
                        $queryBuilder->expr()->like('user.lastName', "'%". $arrayName[1] ."%'"));
                }
            }
            
            if($request->getQuery('idEmployer')){
                $queryBuilder->andWhere(
                        $queryBuilder->expr()->eq("user.id", (int)$request->getQuery('idEmployer')));
            }
            
            if ( $request->getQuery('email') ) {
                $queryBuilder->andWhere(
                    $queryBuilder->expr()->like('user.email',
                        "'%" . $request->getQuery('email') ."%'" ));
            }
            
            if ( $request->getQuery('currency')) {
                $queryBuilder->andWhere(
                        $queryBuilder->expr()->eq("user.currency", 
                        $queryBuilder->expr()->literal($request->getQuery('currency'))));
            }

            if($request->getQuery('country')){
                $queryBuilder->andWhere(
                        $queryBuilder->expr()->eq("user.country", (int)($request->getQuery('country'))));
            }
            if(!$request->getQuery('includeInactive') || ($request->getQuery('includeInactive') && $request->getQuery('includeInactive') == 'false')){
                $queryBuilder->andWhere(
                        $queryBuilder->expr()->eq("user.isActive", 1));
            }
        }
        $queryBuilder->orderBy('user.createdTime', 'ASC');
        $adapter = new DoctrineAdapter(new ORMPaginator($queryBuilder));
        $paginator = new ZendPaginator($adapter);
        $paginator->setDefaultItemCountPerPage(10);
        $page = (int)$this->getRequest()->getQuery('page');
        if($page) $paginator->setCurrentPageNumber($page);
        $data = array();
        $helper = new Helper();
        
        foreach($paginator as $user){
            $userData = $user->getData();
            $userData['employer'] = $user->getEmployer()->getData();
            $userData['createdTime'] = $helper->formatDate($userData['createdTime']);
            $data[] = $userData;
        }
        return new JsonModel(array(
            'employers'=>$data,
            'pages' => $paginator->getPages()
        ));
    }
}