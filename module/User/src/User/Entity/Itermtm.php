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
     * @var decimal
     * @ORM\Column(type="decimal")
     */
    protected $rate;

	/**
     * @var integer
     * @ORM\Column(type="integer")
     */
    protected $sourcerepetitions;
	
	/**
     * @var integer
     * @ORM\Column(type="integer")
     */
    protected $raterepetitions;
	
	/**
     * @var integer
     * @ORM\Column(type="integer")
     */
    protected $sourcebawu;
	
	/**
     * @var integer
     * @ORM\Column(type="integer")
     */
    protected $rateyibai;
	
	/**
     * @var integer
     * @ORM\Column(type="integer")
     */
    protected $ratejiuwu;
	
	/**
     * @var integer
     * @ORM\Column(type="integer")
     */
    protected $ratebawu;
	
	/**
     * @var integer
     * @ORM\Column(type="integer")
     */
    protected $rateqiwu;
	
	/**
     * @var integer
     * @ORM\Column(type="integer")
     */
    protected $ratewushi;
	
	/**
     * @var integer
     * @ORM\Column(type="integer")
     */
    protected $ratenomatch;
	
	
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
     * @var float
     * @ORM\Column(type="decimal")
     */
    protected $total = 0;
   
     public function getProject(){
        return $this->project;
    }

    public function setProject($project){
        $this->project = $project;
    }    
	public function getData(){
        return [
            'name' => $this->name,
            'file' => $this->file,
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