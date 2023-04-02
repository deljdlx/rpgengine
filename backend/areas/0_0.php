<?php
ini_set('display_errors', true);
class Area implements JsonSerializable
{
    private $elements = [];

    public function add(string $name, $x, $y, $element)
    {
        $this->elements[] = [
            'name' => $name,
            'x' => $x,
            'y' => $y,
            'element' => $element,
        ];
    }

    public function jsonSerialize(): mixed
    {
        return $this->elements;
    }
}


$area = new Area();
$area->add('house-00', 10, 0, 'House01');
$area->add('fountain-00', 200, 360, 'Fountain00');
$area->add('woman-00', 50, 210, 'Woman00');
$area->add('fence-group-00', 250, 0, 'FenceGroup00');

// $area->add(10, 0, 'House00');


echo json_encode($area);



