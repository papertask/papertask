<?php
/**
 * Created by PhpDesigner.
 * User: Gao
 * Date: 12/13/14
 * Time: 11:59 PM
 */

namespace User\Entity;

use Common\Entity;
use Doctrine\ORM\Mapping as ORM;

/** @ORM\Entity */
class Roles {

    const PM_ROLE_ID        = 7;
    const SALES_ROLE_ID     = 5;

    /**
     * @var integer
     *
     * @ORM\Column(type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    protected $id;

    /**
     * @ORM\Column(type="string",nullable=true)
     */
    protected $type;
    
    /**
     * @var integer
     * @ORM\Column(type="integer", nullable=true)
     */
    protected $subtype;

    public function getData(){
        return [
            'id' => $this->id,
            'type' => $this->type,
            'subtype' => $this->subtype
        ];
    }
} 