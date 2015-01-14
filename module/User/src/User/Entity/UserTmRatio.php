<?php
/**
 * Created by Gao.
 * User: meas
 * Date: 11/18/14
 * Time: 11:50 AM
 */

namespace User\Entity;

use Doctrine\ORM\Mapping as ORM;

use Common\Entity;

/** @ORM\Entity */
class UserTmRatio extends Entity {

   /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     */
    protected $id;

    /**
     * @var \User\Entity\User
     * @ORM\ManyToOne(targetEntity="User", cascade={"remove"})
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="user_id", referencedColumnName="id", onDelete="cascade")
     * })
     */
    protected $user;

    /**
     * @var string
     * @ORM\Column(type="integer", nullable=true)
     */
    protected $repetitions;
    
    /**
     * @var string
     * @ORM\Column(type="integer", nullable=true)
     */
    protected $yibai;
    
    /**
     * @var string
     * @ORM\Column(type="integer", nullable=true)
     */
    protected $jiuwu;
    
    /**
     * @var string
     * @ORM\Column(type="integer", nullable=true)
     */
    protected $bawu;
    
    /**
     * @var string
     * @ORM\Column(type="integer", nullable=true)
     */
    protected $qiwu;
    
    /**
     * @var string
     * @ORM\Column(type="integer", nullable=true)
     */
    protected $wushi;
    
    /**
     * @var string
     * @ORM\Column(type="integer", nullable=true)
     */
    protected $nomatch;

    public function getData(){
        return array(
            'id' => $this->id,
            'user' => $this->user->getData(),
       		'repetitions'=>$this->repetitions,
        	'yibai'=>$this->yibai,
        	'jiuwu'=>$this->jiuwu,
        	'bawu'=>$this->bawu,
        	'qiwu'=>$this->qiwu,
        	'wushi'=>$this->wushi,
        	'nomatch'=>$this->nomatch
        );
    }

    public function getId(){
        return $this->id;
    }
}