<?php
/**
 * Created by PhpStorm.
 * User: antiprovn
 * Date: 9/28/14
 * Time: 11:51 AM
 */

namespace User\Entity;

use Doctrine\ORM\Mapping as ORM;

/** @ORM\Entity */
class Language{

    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     */
    protected $id;

    /** @ORM\Column(type="string", length=2) */
    protected $code;

    /** @ORM\Column(type="string") */
    protected $name;
	
	/** @ORM\Column(type="string") */
    protected $name_cn;

    public function getData(){
        return array(
            'id' => $this->id,
            'code' => $this->code,
            'name' => $this->name,
			'name_cn' => $this->name_cn,
        );
    }

    public function getId(){
        return $this->id;
    }
}