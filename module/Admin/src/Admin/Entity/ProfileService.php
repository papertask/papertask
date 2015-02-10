<?php
/**
 * Created by PhpStorm.
 * User: thi.to
 * Date: 10/21/2014
 * Time: 3:58 PM
 */

namespace Admin\Entity;

use Common\Entity;
use Doctrine\ORM\Mapping as ORM;

/** @ORM\Entity */
class ProfileService extends Entity {
    /**
     * @var integer
     *
     * @ORM\Column(type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    protected $id;

    /** @ORM\Column(type="string") */
    protected $name;

    /**
     * @ORM\Column(type="decimal", precision=19, scale=2)
     */
    protected $currencyRate;


    /**
     * Set data
     * @param array $arr
     * @return $this
     */
    public function setData(array $arr){
        $keys = array(
            'currencyRate',
			'name',
        );
        foreach($keys as $key){
            if(isset($arr[$key])){
                $this->$key = $arr[$key];
            }
        }
        return $this;
    }

    /**
     * @return array
     */
    public function getData(){
        return array(
            'id' => $this->id,
            'currencyRate' => $this->currencyRate,
			'name' => $this->name
        );
    }
} 