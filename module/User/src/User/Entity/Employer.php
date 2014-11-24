<?php
/**
 * Created by PhpStorm.
 * User: antiprovn
 * Date: 10/1/14
 * Time: 6:17 AM
 */

namespace User\Entity;

use Doctrine\ORM\Mapping as ORM;

use Common\Entity;


/** @ORM\Entity */
class Employer extends Entity{

    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     */
    protected $id;

    /**
     * @var \User\Entity\Company
     * @ORM\ManyToOne(targetEntity="Company")
     */
    protected $company;

    /**
     * @var string
     * @ORM\Column(type="string")
     */
    protected $name;

    /**
     * @var string
     * @ORM\Column(type="string")
     */
    protected $position = '';

    /**
     * @var int
     * @ORM\Column(type="integer")
     */
    protected $defaultServiceLevel = 1;


    public function getData(){
        return [
            'id' => $this->id,
            'name' => $this->name,
            'position' => $this->position,
            'defaultServiceLevel' => $this->defaultServiceLevel,
            'company' => $this->company ? $this->company->getData() : null,
        ];
    }

    public function getListData(){
        return [
            'id' => $this->id,
            'name' => $this->name,
            'position' => $this->position,
            'defaultServiceLevel' => $this->defaultServiceLevel,
        ];
    }

    public function updateData($data){
    	$this->setData($data);
    }
} 