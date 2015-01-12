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

     /** @ORM\Column(type="string", nullable=true) */
    protected $comments;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    protected $contracted;

    /**
     * @var \User\Entity\Staff
     * @ORM\ManyToOne(targetEntity="Staff")
     */
    protected $pm;

    /**
     * @var \User\Entity\Staff
     * @ORM\ManyToOne(targetEntity="Staff")
     */
    protected $sales;

    public function getData(){
        return [
            'company' => $this->company ? $this->company->getData() : null,
            'defaultServiceLevel' => $this->defaultServiceLevel,
            'id' => $this->id,
            'name' => $this->name ? $this->name : '',
            'position' => $this->position,
            'comments' => $this->comments,
            'contracted'=> $this->contracted,
            'pm' => $this->pm ? $this->pm->getData() : null,
            'sales' => $this->sales ? $this->sales->getData() : null
        ];
    }

    public function getListData(){
        return [
            'id' => $this->id,
            'name' => $this->name
        ];
    }

    public function updateData($data){
        $this->setData($data);
    }
} 