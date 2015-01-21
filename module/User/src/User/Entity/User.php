<?php
/**
 * Created by PhpStorm.
 * User: antiprovn
 * Date: 9/19/14
 * Time: 12:14 AM
 */
namespace User\Entity;

use Doctrine\ORM\Mapping as ORM;
use Zend\InputFilter\Factory as InputFactory;
use Zend\InputFilter\InputFilter;
use Zend\InputFilter\InputFilterAwareInterface;
use Zend\InputFilter\InputFilterInterface;
use Zend\Session\Container;

use User\Model\Password;
use Common\Mail;
use Common\Func;
use Common\Entity;
use User\Entity\UserGroup;

/** @ORM\Entity */
class User extends Entity implements InputFilterAwareInterface{

    /**
     * @var integer
     *
     * @ORM\Column(type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    protected $id;

    /** @ORM\Column(type="string") */
    protected $firstName;

    /** @ORM\Column(type="string") */
    protected $lastName;
	
	 /** @ORM\Column(type="string") */
    protected $username;

    /**
     * @var \User\Entity\UserGroup
     * @ORM\ManyToOne(targetEntity="UserGroup")
     */
    protected $group;

    /** @ORM\Column(type="string", unique=true) */
    protected $email;

    /** @ORM\Column(type="string") */
    protected $password;

    /** @ORM\Column(type="string", nullable=true) */
    protected $phone;

    /** @ORM\Column(type="datetime") */
    protected $lastLogin;

    /** @ORM\Column(type="datetime") */
    protected $createdTime;

    /** @ORM\Column(type="boolean") */
    protected $isActive = 0;

    /** @ORM\Column(type="boolean") */
    protected $profileUpdated = false;

    /** @ORM\Column(type="string", nullable=true) */
    protected $token = Null;

    /**
     * @var \User\Entity\Country
     * @ORM\ManyToOne(targetEntity="Country")
     */
    protected $country = null;

    /** @ORM\Column(type="string", nullable=true) */
    protected $city = null;

    /** @ORM\Column(type="boolean") */
    protected $gender = 0;

    /** @ORM\Column(type="string") */
    protected $currency = 'cny';

    /**
     * @var \User\Entity\Freelancer
     * @ORM\OneToOne(targetEntity="Freelancer")
     */
    protected $freelancer;

    /**
     * @var \User\Entity\Employer
     * @ORM\OneToOne(targetEntity="Employer", cascade="remove")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="employer_id", referencedColumnName="id", onDelete="cascade")
     * })
     */
    protected $employer;
    /**
     * @ORM\OneToOne(targetEntity="\User\Entity\Staff", cascade={"remove"})
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="staff_id", referencedColumnName="id", onDelete="cascade")
     * })
     */
    protected $staff;

    /**
     * @ORM\Column(type="string", nullable=true)
     */
    protected $alias;

    /**
     * @ORM\Column(type="string", nullable=true)
     */
    protected $cellphone;

    // class variables
    protected $inputFilter;

    /**
     * Get id
     *
     * @return integer
     */
    public function getId(){
        return $this->id;
    }

    /**
     *
     * Set group Id
     * @param UserGroup
     */
    public function setGroup(UserGroup $group){
        $this->group = $group;
    }

    /**
     * Set data
     * @param array $arr
     * @return $this
     */
    public function setData(array $arr){
        $keys = array(
            'city',
            'country',
            'currency',
            'createdTime',
            'email',
            'firstName',
            'gender',
            'lastLogin',
            'lastName',
			'username',
            'password',
            'phone',            
            'isActive',
            'profileUpdated',
            'alias',
            'cellphone'
        );
        foreach($keys as $key){
            if(isset($arr[$key])){
                $this->$key = $arr[$key];
            }
        }
        return $this;
    }

    /**
     * update data
     * @param array $arr
     * @return $this
     */
    public function updateData(array $arr){
        $keys = array(
            'city',
            'country',
            'currency',
            'firstName',
            'gender',
            'lastName',
			'username',
            'phone',
            'profileUpdated',
            'isActive',
            'cellphone'
        );

        if(isset($arr['currency']) and !in_array($arr['currency'], ['usd', 'cny'])){
            throw new \Exception("Invalid currency '{$arr['currency']}'");
        }

        foreach($keys as $key){
            if(isset($arr[$key])){
                $this->$key = $arr[$key];
            }
        }

        return $this;
    }

    public function getArrayCopy()
    {
        return get_object_vars($this);
    }

    function exchangeArray($data){
        return $this->setData($data);
    }

    // TODO: Add content to this method:
    public function setInputFilter(InputFilterInterface $inputFilter)
    {
        throw new \Exception("Not used");
    }

    public function getInputFilter(){

        if (!$this->inputFilter) {
            $inputFilter = new InputFilter();
            $factory     = new InputFactory();
            $inputFilter->add($factory->createInput(array(
                'name' => 'lastName',
                'required' => true,
                'validators' => array(
                    array(
                        "name" => "NotEmpty",
                    )
                ),
            )));
            $inputFilter->add($factory->createInput(array(
                'name' => 'firstName',
                'required' => true,
                'validators' => array(
                    array(
                        "name" => "NotEmpty",
                    )
                ),
            )));
            $inputFilter->add($factory->createInput(array(
                'name' => 'email',
                'required' => true,
                'validators' => array(
                    array(
                        "name" => "NotEmpty",
                    ),
                    array(
                        'name' => 'EmailAddress',
                    )
                ),
            )));
            $inputFilter->add($factory->createInput(array(
                'name' => 'phone',
                'required' => true,
                'validators' => array(
                    array(
                        "name" => "NotEmpty",
                    )
                ),
            )));
            $inputFilter->add($factory->createInput(array(
                'name' => 'password',
                'required' => true,
                'validators' => array(
                    array(
                        "name" => "NotEmpty",
                    )
                ),
            )));
            $this->inputFilter = $inputFilter;
        }

        return $this->inputFilter;
    }

    public function encodePassword($newPassword = null){
        if($newPassword){
            $this->password = $newPassword;
        }
        $passClass = new Password();
        $this->password = $passClass->create_hash($this->password);
        return $this;
    }

    /**
     * Get password hash
     * @return string
     */
    public function getPasswordHash(){
        return $this->password;
    }

    /**
     * Check user is active or not
     * @return boolean
     */
    public function isActivated(){
        return ($this->isActive == True);
    }

    /**
     * Check if user profile is updated
     * @return bool
     */
    public function isProfileUpdated(){
        return $this->profileUpdated;
    }

    /**
     * Get email of user
     * @return mixed
     */
    public function getEmail(){
        return $this->email;
    }

    /**
     * @return UserGroup
     */
    function getGroup(){
        return $this->group;
    }

    /**
     * @param $token
     * @return bool
     */
    public function isTokenValid($token){
        return $this->token === $token && strlen($token) == 32;
    }

    /**
     * @param string $token
     * @param \Doctrine\ORM\EntityManager $entityManager
     * @return bool
     */
    public function activate($token, $entityManager){
        if($this->isTokenValid($token)){
            $this->token = '';
            $this->isActive = true;
            $entityManager->persist($this);
            $entityManager->flush();
            return true;
        }
        return false;
    }

    /**
     * @param string $token
     * @param string $newPassword
     * @param \Doctrine\ORM\EntityManager $entityManager
     * @return bool
     */
    public function reset($token, $newPassword, $entityManager){
        if($this->isTokenValid($token)){
            $this->token = '';
            $this->encodePassword($newPassword);
            $entityManager->persist($this);
            $entityManager->flush();
            return true;
        }
        return false;
    }

    public function generateToken(){
        $tokenLength = 16;
        $token = time();
        for($i = 0; $i < $tokenLength; $i++){
            $token .= chr(rand(1, 255));
        }
        $this->token = md5($token);
    }

    public function authenticate(){
        $sessionContainer = new Container('user');
        $sessionContainer->user_id = $this->id;
    }

    /**
     * Get current login user id
     * @return int
     */
    static public function currentLoginId(){
        $sessionContainer = new Container('user');
        return $sessionContainer->user_id;
    }

    public function checkPassword($password){
        $passClass = new Password();
        return $passClass->validate_password($password, $this->password);
    }

    /**
     * @param \Application\Controller\AbstractActionController $controller
     */
    public function sendConfirmationEmail($controller,$lang_code=''){
        // initial data for email template
		
        $confirmLink = $controller->getBaseUrl(). $lang_code . '/user/register/confirm?token=' . $this->token;
		$data = array(
            'firstName' => $this->firstName,
            'lastName' => $this->lastName,
            'link' => $confirmLink,
        );
        Mail::sendMail($controller, "USER_CONFIRM", $this->email, $data);
    }

    /**
     * @param \Application\Controller\AbstractActionController $controller
     */
    public function sendWelcomeEmail($controller){
        // initial data for email template
        $data = array(
            'firstName' => $this->firstName,
            'lastName' => $this->lastName,
        );
        Mail::sendMail($controller, "USER_WELCOME", $this->email, $data);
    }

    /**
     * @param \Application\Controller\AbstractActionController $controller
     */
    public function sendForgotPasswordEmail($controller){
        // initial data for email template
        $forgotLink = $controller->getBaseUrl() . '/user/forgotPassword/reset?token=' . $this->token;
        $data = array(
            'firstName' => $this->firstName,
            'lastName' => $this->lastName,
            'link' => $forgotLink,
        );
        Mail::sendMail($controller, "USER_RESET", $this->email, $data);
    }

    public function getData(){
        return array(
            "city" => $this->city,
            "country" => $this->country ? $this->country->getData() : null,
            'currency' => $this->currency,
            "createdTime" => $this->createdTime,
            "email" => $this->email,
            "firstName" => $this->firstName,
            'gender' => $this->gender,
            "group" => $this->group ? $this->group->getData() : null,
            "id" => $this->id,
            "isActive" => $this->isActive,
            "lastLogin" => $this->lastLogin,
            "lastName" => $this->lastName,
			"username" => $this->username,
            "phone" => $this->phone,
            "profileUpdated" => $this->profileUpdated,
            "alias" => $this->alias,
            "cellphone" => $this->cellphone
        );
    }

    /**
     * @return Freelancer
     */
    public function getFreelancer(){
        return $this->freelancer;
    }

    /**
     * @return Employer
     */
    public function getEmployer(){
        return $this->employer;
    }

    /**
     * @return Staff
     */
    public function getStaff(){
        return $this->staff;
    }

    /**
     * @return bool
     */
    public function isEmployer(){
        return $this->getGroup()->isEmployer();
    }

    /**
     * @return bool
     */
    public function isFreelancer(){
        return $this->getGroup()->isFreelancer();
    }

    /**
     * @return bool
     */
    public function isAdmin(){
        return $this->getGroup()->isAdmin();
    }

    public function setGroupByName($name, $entityManager){
        if($name == 'freelancer'){
            $this->setGroup($entityManager->getReference('\User\Entity\UserGroup', UserGroup::FREELANCER_GROUP_ID));
            $freelancer = new Freelancer();
            $freelancer->save($entityManager);
            $this->freelancer = $freelancer;
        }else if($name == 'employer'){
            $this->setGroup($entityManager->getReference('\User\Entity\UserGroup', UserGroup::EMPLOYER_GROUP_ID));
            $employer = new Employer();
            $employer->setData(['name' => $this->firstName . ', ' . $this->lastName, 'alias'=>$this->getAlias( $entityManager, UserGroup::EMPLOYER_GROUP_ID)]);
            $employer->save($entityManager);
            $this->employer = $employer;
        } else if ( $name == 'staff' ) {
        	$this->setGroup( $entityManager->getReference('\User\Entity\UserGroup', UserGroup::ADMIN_GROUP_ID));
        	$staff = new Staff();
        	$staff->setData(['name' => $this->firstName . ', ' . $this->lastName, 'alias'=>$this->getAlias( $entityManager, UserGroup::EMPLOYER_GROUP_ID)]);
        	$staff->save($entityManager);
        	$this->staff = $staff;
        }
    }

    protected function generateRandomString($length = 10) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, strlen($characters) - 1)];
        }
        return $randomString;
    }

    public function generateRandomNumber ( $length = 8 ) {
        $characters = '01234567890';
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, strlen($characters) - 1)];
        }
        return $randomString;
    }

    public function createUserBySocialProfile($controller, $profile, $group){
        $entityManager = $controller->getEntityManager();
        $data = array(
            'email' => $profile->getEmail(),
            'lastName' => $profile->getLastName(),
            'firstName' => $profile->getFirstName(),
            'lastLogin' => new \DateTime('now'),
            'createdTime' => new \DateTime('now'),
        );
        $this->setData($data);
        $this->encodePassword($this->generateRandomString());
        $this->setGroupByName($group, $entityManager);
        $entityManager->persist($this);
        $entityManager->flush();
        $controller->redirect()->toUrl('/user/dashboard');
    }

    public function createStaff( $controller, $data , $lang_code = '')
    {
        $entityManager = $controller->getEntityManager();
        $strAlias = $this->getAlias( $entityManager, UserGroup::ADMIN_GROUP_ID );
        $data['alias'] = $strAlias;
		
        $this->setData($data);
        $this->encodePassword(isset($data['password'])? $data['password'] : $this->generateRandomString());
        $this->setGroupByName('staff', $entityManager);
        $entityManager->persist($this);
        $entityManager->flush();
        $this->sendConfirmationEmail($controller,$lang_code);
    }

    public function getAlias( $entityManager, $group ) {
        $strAlias = '';


        switch ( $group ) {
            case UserGroup::ADMIN_GROUP_ID:
                $strAlias = "PT". $this->generateRandomNumber();
                $userList = $entityManager->getRepository('User\Entity\User');
                $queryBuilder = $userList->createQueryBuilder('user');
                $queryBuilder->where('user.alias=?1')->setParameter(1, $strAlias);
                $testStaffList = $queryBuilder->getQuery()->getArrayResult();
                while ( $testStaffList != null ) {
                    $strAlias = "PT". $this->generateRandomNumber();
                    $queryBuilder = $userList->createQueryBuilder('user');
                    $queryBuilder->where('user.alias=?1')->setParameter(1, $strAlias);
                    $testStaffList = $queryBuilder->getQuery()->getArrayResult();
                    sleep( 1 );
                }
                break;
            case UserGroup::EMPLOYER_GROUP_ID:
                $strAlias = "CL" . $this->generateRandomNumber();
                $userList = $entityManager->getRepository('User\Entity\User');
                $queryBuilder = $userList->createQueryBuilder('user');
                $queryBuilder->where('user.alias=?1')->setParameter(1, $strAlias);
                $testClientList = $queryBuilder->getQuery()->getArrayResult();
                while ( $testClientList != null ) {
                    $strAlias = "CL" . $this->generateRandomNumber();
                    $queryBuilder = $userList->createQueryBuilder('user');
                    $queryBuilder->where('user.alias=?1')->setParameter(1, $strAlias);
                    $testClientList = $queryBuilder->getQuery()->getArrayResult();
                    sleep( 1 );
                }
                break;
			case UserGroup::FREELANCER_GROUP_ID:
                $strAlias = "FR" . $this->generateRandomNumber();
                $userList = $entityManager->getRepository('User\Entity\User');
                $queryBuilder = $userList->createQueryBuilder('user');
                $queryBuilder->where('user.alias=?1')->setParameter(1, $strAlias);
                $testClientList = $queryBuilder->getQuery()->getArrayResult();
                while ( $testClientList != null ) {
                    $strAlias = "FR" . $this->generateRandomNumber();
                    $queryBuilder = $userList->createQueryBuilder('user');
                    $queryBuilder->where('user.alias=?1')->setParameter(1, $strAlias);
                    $testClientList = $queryBuilder->getQuery()->getArrayResult();
                    sleep( 1 );
                }
                break;	
            default:
                break;
        }
        return $strAlias;
    }

    public function createEmployer( $controller, $data, $entityManager, $lang_code='' ) 
    {
        $strAlias = $this->getAlias( $controller->getEntityManager(), UserGroup::EMPLOYER_GROUP_ID);
        $data = array(
            'email' => $data['email'],
            'lastName' => $data['lastName'],
            'firstName' => $data['firstName'],
            'lastLogin' => new \DateTime('now'),
            'createdTime' => new \DateTime('now'),
            'alias' => $strAlias,
        );
        $this->setData($data);
        $this->encodePassword($this->generateRandomString());
        $this->setGroupByName('employer', $entityManager);
        $entityManager->persist($this);
        $entityManager->flush();
        
        $this->sendConfirmationEmail( $controller, $lang_code );
    }
	public function createFreelancer( $controller, $data, $entityManager,$lang_code='' ) 
    {
        $strAlias = $this->getAlias( $controller->getEntityManager(), UserGroup::FREELANCER_GROUP_ID);
        $data = array(
            'email' => $data['email'],
            'lastName' => $data['lastName'],
            'firstName' => $data['firstName'],
            'lastLogin' => new \DateTime('now'),
            'createdTime' => new \DateTime('now'),
			'alias' => $strAlias,
        );
        $this->setData($data);
        $this->encodePassword($this->generateRandomString());
        $this->setGroupByName('freelancer', $entityManager);
        $entityManager->persist($this);
        $entityManager->flush();
        
        $this->sendConfirmationEmail( $controller, $lang_code );
    }
}
