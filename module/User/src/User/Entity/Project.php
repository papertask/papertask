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
class Project extends Entity{

    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     */
    protected $id;

    /**
     * @var integer
     * @ORM\Column(type="integer")
     */
    protected $status;

    /**
     * @var \User\Entity\Language
     * @ORM\ManyToOne(targetEntity="Language")
     */
    protected $sourceLanguage;

    /**
     * @var \User\Entity\Language
     * @ORM\ManyToMany(targetEntity="Language")
     */
    protected $targetLanguages;
	
	/**
     * @var string
     * @ORM\Column(type="string", nullable=True)
     */
    protected $quote_no;

    /**
     * @var string
     * @ORM\Column(type="string")
     */
    protected $reference;
	/**
     * @var integer
     * @ORM\Column(type="integer")
     */
    protected $tax=0;

	/**
     * @var float
     * @ORM\Column(type="decimal", scale=2, precision=6)
     */
    protected $discount = 0.00;

    /**
     * @var integer
     * @ORM\Column(type="integer")
     */
    protected $priority;

    /**
     * @var string
     * @ORM\Column(type="datetime")
     */
    protected $startDate;

    /**
     * @var string
     * @ORM\Column(type="datetime")
     */
    protected $dueDate;

    /**
     * @var \User\Entity\Field
     * @ORM\ManyToOne(targetEntity="Field")
     */
    protected $field;

    /**
     * @var \User\Entity\User
     * @ORM\ManyToOne(targetEntity="User")
     */
    protected $client;

    /**
     * @var \User\Entity\Staff
     * @ORM\ManyToOne(targetEntity="Staff")
     * @ORM\JoinTable(name="ProjectSale")
     */
    protected $sale;

    /**
     * @var \User\Entity\Staff
     * @ORM\ManyToOne(targetEntity="Staff")
     * @ORM\JoinTable(name="ProjectPm")
     */
    protected $pm;
    /**
     * @var string
     * @ORM\Column(type="string", nullable=True)
     */
    protected $interpretingInfo;

    /**
     * @var int
     * @ORM\Column(type="integer")
     */
    protected $serviceLevel = 0;

    /**
     * @var int
     * @ORM\Column(type="integer")
     */
    protected $duration = 0;

    /**
     * @var bool
     * @ORM\Column(type="boolean")
     */
    protected $is_deleted = 0;

    /**
     * @var int
     * @ORM\Column(type="integer")
     */
    protected $payStatus = 1;  # unpaid
	
	/** @ORM\Column(type="string", nullable=true) */
    protected $po = null;
	
	/** @ORM\Column(type="string", nullable=true) */
    protected $sourcetext = null;
	/** @ORM\Column(type="string", nullable=true) */
    protected $currency = null;
    
	/**
     * @var int
     * @ORM\Column(type="array", length=255)
     */
    protected $types;
	
	

    public function getData(){
        return [
            'client' => $this->client->getEmployer()->getData(),
			'userid' => $this->client->getId(),
            'dueDate' => $this->dueDate,
			'quote_no' => $this->quote_no,
			'tax' => $this->tax,
			'discount' => $this->discount,
            'duration' => $this->duration,
            'field' => $this->field->getData(),
            'id' => $this->id,
            'interpretingInfo' => $this->interpretingInfo,
            'serviceLevel' => $this->serviceLevel,
            'pm' => $this->pm->getData(),
            'priority' => $this->priority,
            'reference' => $this->reference,
            'sale' => ($this->sale)?$this->sale->getData():null,
            'sourceLanguage' => $this->sourceLanguage->getData(),
            'startDate' => $this->startDate,
            'status' => $this->status,
            'targetLanguages' => $this->getArrayData($this->targetLanguages),
			'po' => $this->po,
			'sourcetext' => $this->sourcetext,
			'currency' =>  $this->currency,
            'types' => $this->types
        ];
    }
	
    public function getId(){
        return $this->id;
    }
}