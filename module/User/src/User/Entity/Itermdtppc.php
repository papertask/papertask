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
class Itermdtppc extends Entity{

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
     * @var \User\Entity\File
     * @ORM\ManyToOne(targetEntity="File")
     */
    protected $file;
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
    protected $quantity;

    /**
     * @var integer
     * @ORM\Column(type="integer", nullable=true)
     */
    protected $unit;
	
	/**
     * @var \User\Entity\DesktopSoftware
     * @ORM\ManyToOne(targetEntity="DesktopSoftware")
     */
    protected $software;
	
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
			'quantity' => $this->quantity,
            'unit' => $this->unit,
			'software' => $this->software->getData()
        ];
    }
}