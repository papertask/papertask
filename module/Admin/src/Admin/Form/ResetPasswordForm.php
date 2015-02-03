<?php
/**
 * Created by PhpStorm.
 * User: antiprovn
 * Date: 9/24/14
 * Time: 9:40 PM
 */

namespace Admin\Form;

use Zend\Form\Form;
use Zend\Form\Element;
use Zend\InputFilter;
use Zend\Validator;

class ResetPasswordForm  extends Form{

    public function __construct(){
        parent::__construct();
        $this->setAttribute('method', 'post');
        $this->getInputFilter();
        $this->add(array(
            'name' => 'current',
            'attributes' => array(
                'id' => 'current',
                'class' => 'form-control',
                'required' => true,
                'type'  => 'password',
                'data-ng-model' => 'current',
            ),
            'options' => array(
                'label' => 'Current password',
            ),
        ));
        $this->add(array(
            'name' => 'new',
            'attributes' => array(
                'id' => 'new',
                'class' => 'form-control',
                'required' => true,
                'type'  => 'password',
                'data-ng-model' => 'new',
            ),
            'options' => array(
                'label' => 'New password',
            ),
        ));
        $this->add(array(
            'name' => 'confirm',
            'attributes' => array(
                'id' => 'confirm',
                'class' => 'form-control',
                'required' => true,
                'type'  => 'password',
                'data-ng-model' => 'confirm',
            ),
            'options' => array(
                'label' => 'Re-enter Password',
            ),
            'validators' => array(
                array(
                    'name' => 'Identical',
                    'options' => array(
                        'token' => 'password',
                    ),
                ),
            ),
        ));

        $this->setInputFilter($this->createInputFilter());
    }

    protected function createInputFilter(){
        $inputFilter = new InputFilter\InputFilter();

        // password
        $password = new InputFilter\Input('new');
        $password->setRequired(true);
        // Generate password validator chain
        $validatorPasswordChain = new Validator\ValidatorChain();
        $validatorPasswordChain->attach(
            new Validator\StringLength(array('min' => 6)));
        $password->setValidatorChain($validatorPasswordChain);
        $inputFilter->add($password);

        // confirmation
        $confirmation = new InputFilter\Input('confirm');
        $confirmation->setRequired(true);
        $confirmation->setValidatorChain($validatorPasswordChain);
        $inputFilter->add($confirmation);

        return $inputFilter;
    }

    public function reset($controller){
        var_dump("Im here! form/reset");
        $data = $this->getData();
        $curr = $data['current'];
        if($data['new'] == $data['confirm']){
            $entityManager = $controller->getEntityManager();
            $user = $controller->getUser(array('token' => $token));
            if($user){
                $user->reset($token, $data['new'], $entityManager);
            }
            return false;
        }
    }

}
