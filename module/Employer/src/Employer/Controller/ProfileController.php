<?php
/**
 * Zend Framework (http://framework.zend.com/)
 *
 * @link      http://github.com/zendframework/ZendSkeletonAdmin for the canonical source repository
 * @copyright Copyright (c) 2005-2014 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace Employer\Controller;

use Zend\View\Model\ViewModel;

use Application\Controller\AbstractActionController;

class ProfileController extends AbstractActionController
{
    protected $requiredLogin = true;

    public function indexAction()
    {
      $user = $this->getCurrentUser();
      $employer = $user->getEmployer();
      $entityManager = $this->getEntityManager();
      $pCompanies = $entityManager->getRepository('User\Entity\Company')->findAll();
      $companies = array();
      foreach ($pCompanies as $k => $v) {
          $companies[$k] = $v->getData();
      }
      return new ViewModel( array (
              "user" => $user->getData(),
              "employer" => $employer->getData(),
              'companies' => $companies
      ));
    }

}
