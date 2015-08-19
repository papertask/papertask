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
class Transaction extends Entity{

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
     * @ORM\Column(type="decimal", scale=3, precision=6)
     */
    protected $fee=0;

	/**
     * @var float
     * @ORM\Column(type="decimal", scale=3, precision=6)
     */
    protected $subtotal = 0.00;
	/**
     * @var float
     * @ORM\Column(type="decimal", scale=3, precision=6)
     */
    protected $total = 0.00;
	
	/**
     * @var int
     * @ORM\Column(type="integer")
     */
    protected $typeStatus = 1;  # 1 : incoming , outgoing : 2
    

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
     * @var string
     * @ORM\Column(type="string", nullable=True)
     */
    protected $currency;

    /**
     * @var \User\Entity\User
     * @ORM\ManyToOne(targetEntity="User")
     */
    protected $client;
	
	/**
     * @var \User\Entity\User
     * @ORM\ManyToOne(targetEntity="User")
     */
    protected $freelancer;
    
    /**
     * @var bool
     * @ORM\Column(type="boolean")
     */
    protected $is_deleted = 0;

    
	/**
     * @var int
     * @ORM\Column(type="array", length=255, nullable=True)
     */
    protected $items;
	
	

    public function getData(){
        return [
			'id' => $this->id,
            'client' => ($this->client)?$this->client->getEmployer()->getData():null,
            'freelancer' => ($this->freelancer)?$this->freelancer->getData():null,
            'createDate' => $this->createDate,
			'payDate' => $this->payDate,
			'intrans_no' => $this->intrans_no,
			'fapiao_no' => $this->fapiao_no,
			'is_deleted' => $this->is_deleted,
			'fee' => $this->fee,
            'total' => $this->total,
            'subtotal' => $this->subtotal,
            'bank' => $this->bank->getData(),
			'bankuser' => $this->bankuser,
            'items' => ($this->items)?$this->items:null,
			'typeStatus' => $this->typeStatus,
			'currency' => $this->currency,
        ];
    }
	
    public function getId(){
        return $this->id;
    }
}