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
     * @ORM\ManyToOne(targetEntity="\User\Entity\User")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="client_id", referencedColumnName="id", onDelete="cascade")
     * })
     */
    protected $client;

    /**
     * @var string
     * @ORM\Column(type="string", nullable=true)
     */
    protected $name;

    /**
     * @var \User\Entity\Roles
     * @ORM\ManyToOne(targetEntity="Roles")
     */
    protected $type;
    
    public function getData(){
        return [
            'id' => $this->id,
            'client' => ($this->client)?$this->client->getData():null,
            'name' => $this->name,
            'type' => ($this->type)?$this->type->getData():null
        ];
    }
    
    public function setType( $type ) 
    {
    	$this->type = $type;
    }

    public function setName ( $data ) {
        $this->name = $data;
    }

    public function setClient( $client ) {
        $this->client = $client;
    }
    
    public function getId() {
        return $this->id;
    }
}