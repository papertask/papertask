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
class Invoice extends Entity{

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
    protected $invoice_no;
	/**
     * @var string
     * @ORM\Column(type="datetime", nullable=true)
     */
    protected $invoiceDate;

    /**
     * @var string
     * @ORM\Column(type="datetime")
     */
    protected $dueDate;
	
	
	public function getProject(){
        return $this->project;
    }

    public function setProject($project){
        $this->project = $project;
    }
	
	public function getData(){
        return [
			'id' => $this->id,
            'invoice_no' => $this->invoice_no,
            'invoiceDate' => $this->invoiceDate,
			'dueDate' => $this->dueDate
        ];
    }

}