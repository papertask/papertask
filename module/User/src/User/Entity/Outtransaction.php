<?php
/**
 * Created by PhpStorm.
 * User: antiprovn
 * Date: 10/6/14
 * Time: 8:42 AM
 */

namespace User\Entity;

use Doctrine\ORM\Mapping as ORM;
use Common\Entity;


/** @ORM\Entity */
class Outtransaction extends Entity{

    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     */
    protected $id;

    
	/**
     * @var string
     * @ORM\Column(type="string", nullable=True)
     */
    protected $intrans_no;

    /**
     * @var string
     * @ORM\Column(type="string", nullable=True)
     */
    protected $fapiao_no;
	/**
     * @var integer
     * @ORM\Column(type="decimal", scale=2, precision=6)
     */
    protected $fee=0;

	/**
     * @var float
     * @ORM\Column(type="decimal", scale=2, precision=6)
     */
    protected $subtotal = 0.00;
	/**
     * @var float
     * @ORM\Column(type="decimal", scale=2, precision=6)
     */
    protected $total = 0.00;

    

    /**
     * @var string
     * @ORM\Column(type="datetime")
     */
    protected $createDate;

    /**
     * @var string
     * @ORM\Column(type="datetime")
     */
    protected $payDate;

    /**
     * @var \Admin\Entity\ProfileBank
     * @ORM\ManyToOne(targetEntity="Field")
     */
    protected $bank;
	
	/**
     * @var string
     * @ORM\Column(type="string", nullable=True)
     */
    protected $bankuser;

    /**
     * @var \User\Entity\User
     * @ORM\ManyToOne(targetEntity="User")
     */
    protected $client;

    
    /**
     * @var bool
     * @ORM\Column(type="boolean")
     */
    protected $is_deleted = 0;

    
	/**
     * @var int
     * @ORM\Column(type="array", length=255, nullable=True)
     */
    protected $tasks;
	
	

    public function getData(){
        return [
            'client' => ($this->client->getEmployer())?$this->client->getEmployer()->getData():null,
            'createDate' => $this->createDate,
			'payDate' => $this->payDate,
			'intrans_no' => $this->intrans_no,
			'fapiao_no' => $this->fapiao_no,
			'is_deleted' => $this->is_deleted,
			'fee' => $this->fee,
            'total' => $this->total,
            'subtotal' => $this->subtotal,
            'bank' => $this->bank->getData(),
			'bankuser' => $this->bankuser->getData(),
            'tasks' => $this->tasks
        ];
    }
	
    public function getId(){
        return $this->id;
    }
}