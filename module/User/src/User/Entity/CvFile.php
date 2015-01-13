<?php
/**
 * Created by PhpStorm.
 * User: antiprovn
 * Date: 10/6/14
 * Time: 9:46 AM
 */

namespace User\Entity;

use Doctrine\ORM\Mapping as ORM;

use Common\Entity;

/** @ORM\Entity */
class CvFile extends Entity{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     */
    protected $id;

    /**
     * @var string
     * @ORM\Column(type="string")
     */
    protected $name;

    /**
     * @var string
     * @ORM\Column(type="string")
     */
    protected $path;

    /**
     * @var integer
     * @ORM\Column(type="integer")
     */
    protected $size;

    /**
     * @var integer
     * @ORM\Column(type="integer")
     */
    protected $time;

    /**
     * @var \User\Entity\User
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id", nullable=true, onDelete="cascade")
     */
    protected $user;

    public function getData(){
        return [
            'id' => $this->id,
            'name' => $this->name, 
            'path' => $this->path,
            'size' => $this->size
        ];
    }

    public function getId(){
        return $this->id;
    }

    public function setUser ( $user ){
        $this->user = $user;
    }
}