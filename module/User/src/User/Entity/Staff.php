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
use User\Entity\Roles;

/** @ORM\Entity */
class Staff extends Entity{

    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     */
    protected $id;

    /**
     * @var string
     * @ORM\Column(type="string", nullable=true)
     */
    protected $name;

    /**
     * @var \User\Entity\Roles
     * @ORM\OneToOne(targetEntity="Roles")
     */
    protected $type;
    
    public function getData(){
        return [
            'id' => $this->id,
            'name' => $this->name,
            'type' => $this->type->getData(),
        ];
    }
    
    public function setType( $type ) 
    {
    	$this->type = $type;
    }
    
    public function getId() {
        return $this->id;
    }
}