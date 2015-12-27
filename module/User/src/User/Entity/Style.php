<?php
/**
 * Created by PhpStorm.
 * User: antiprovn
 * Date: 10/6/14
 * Time: 9:54 AM
 */

namespace User\Entity;

use Doctrine\ORM\Mapping as ORM;

use Common\Entity;


/** @ORM\Entity */
class Style extends  Entity{
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
    protected $name_cn;

    public function getData(){
        return [
            'id' => $this->id,
            'name' => $this->name,
			'name_cn' => $this->name_cn,
        ];
    }
} 