<?php
/**
 * Created by PhpStorm.
 * User: antiprovn
 * Date: 10/6/14
 * Time: 9:59 AM
 */

namespace User\Entity;

use Doctrine\ORM\Mapping as ORM;

use Common\Entity;

/** @ORM\Entity */
class Itermtm extends Entity{

    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     */
    protected $id;
	
	/**
     * @var \User\Entity\Project
     * @ORM\ManyToOne(targetEntity="Project")
     * @ORM\JoinColumn(name="project_id", referencedColumnName="id", nullable=true)
     */
    protected $project;
	
	/** @ORM\Column(type="string") */
    protected $name;
	
    /**
     * @var \User\Entity\Language
     * @ORM\ManyToOne(targetEntity="Language")
     */
    protected $language;

	/**
     * @var integer
     * @ORM\Column(type="integer")
     */
    protected $sourcerepetitions;
	
	/**
     * @var integer
     * @ORM\Column(type="decimal", scale=2, precision=6)
     */
    protected $raterepetitions = 0.00;
	
	/**
     * @var integer
     * @ORM\Column(type="integer")
     */
    protected $sourcebawu;
	
	/**
     * @var integer
     * @ORM\Column(type="decimal", scale=2, precision=6)
     */
    protected $rateyibai = 0.00;
	
	/**
     * @var integer
     * @ORM\Column(type="decimal", scale=2, precision=6)
     */
    protected $ratejiuwu = 0.00;
	
	/**
     * @var integer
     * @ORM\Column(type="decimal", scale=2, precision=6)
     */
    protected $ratebawu = 0.00;
	
	/**
     * @var integer
     * @ORM\Column(type="decimal", scale=2, precision=6)
     */
    protected $rateqiwu = 0.00;
	
	/**
     * @var integer
     * @ORM\Column(type="decimal", scale=2, precision=6)
     */
    protected $ratewushi = 0.00;
	
	/**
     * @var integer
     * @ORM\Column(type="decimal", scale=2, precision=6)
     */
    protected $ratenomatch = 0.00;
	
	
	/**
     * @var integer
     * @ORM\Column(type="integer")
     */
    protected $sourcejiuwu;
	/**
     * @var integer
     * @ORM\Column(type="integer")
     */
    protected $sourcenomatch;
	/**
     * @var integer
     * @ORM\Column(type="integer")
     */
    protected $sourceqiwu;
	/**
     * @var integer
     * @ORM\Column(type="integer")
     */
    protected $sourcewushi;
	/**
     * @var integer
     * @ORM\Column(type="integer")
     */
    protected $sourceyibai;
	 /**
     * @var decimal
     * @ORM\Column(type="decimal", scale=2, precision=6)
     */
    protected $rate = 0.00; 
	 /**
     * @var float
     * @ORM\Column(type="decimal", scale=2, precision=6)
     */
    protected $total = 0.00;
   
     public function getProject(){
        return $this->project;
    }

    public function setProject($project){
        $this->project = $project;
    }    
	public function getData(){
        return [
			'id' => $this->id,
            'name' => $this->name,
            //'file' => $this->file,
			'language' => $this->language->getData(),
			'rate' => $this->rate,
			'sourcerepetitions' => $this->sourcerepetitions,
            'sourcebawu' => $this->sourcebawu,
			'sourcejiuwu' => $this->sourcejiuwu,
			'sourcenomatch' => $this->sourcenomatch,
			'sourceqiwu' => $this->sourceqiwu,
			'sourcewushi' => $this->sourcewushi,
			'sourceyibai' => $this->sourceyibai,
			'raterepetitions' => $this->raterepetitions,
			'rateyibai' => $this->rateyibai,
			'ratejiuwu' => $this->ratejiuwu,
			'ratebawu' => $this->ratebawu,
			'rateqiwu' => $this->rateqiwu,
			'ratewushi' => $this->ratewushi,
			'ratenomatch' => $this->ratenomatch,
			'total' => $this->total
			
        ];
    }	

}