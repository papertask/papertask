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

use PHPExcel;
use \PHPExcel_IOFactory;
use \Smalot\PdfParser\Parser;

/** @ORM\Entity */
class File extends Entity{
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
    protected $token;

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
    protected $filetype=0;

    /**
     * @var integer
     * @ORM\Column(type="integer")
     */
    protected $time;

    /**
     * @var \User\Entity\Project
     * @ORM\ManyToOne(targetEntity="Project")
     * @ORM\JoinColumn(name="project_id", referencedColumnName="id", nullable=true)
     */
    protected $project;
	
	/**
     * @var \User\Entity\Task
     * @ORM\ManyToOne(targetEntity="Task")
     * @ORM\JoinColumn(name="task_id", referencedColumnName="id", nullable=true)
     */
    protected $task;

	/**
     * @var \User\Entity\Language
     * @ORM\ManyToOne(targetEntity="Language")
     * @ORM\JoinColumn(name="language_id", referencedColumnName="id", nullable=true)
     */
    protected $language;

    public function getData(){
        return [
            'id' => $this->id,
			'name' => $this->name,
			'path' => $this->path,
			'size' => $this->size,
			'project' => ($this->project)?$this->project->getData():null,
			'task' => ($this->task)?$this->task->getData():null,
			'language' => ($this->language)?$this->language->getData():null,
            'token' => $this->token,
            'time' => $this->time,
			'filetype' => $this->filetype,
        ];
    }
	public function getData2(){
        return [
            'id' => $this->id,
			'name' => $this->name,
			'path' => $this->path,
			'size' => $this->size,
			'filetype' => $this->filetype,
        ];
    }
    public function getId(){
        return $this->id;
    }
	
	public function getFiletype(){
        return $this->filetype;
    }
	public function getTask(){
        return $this->task;
    }

    public function getPath(){
        return $this->path;
    }

    public function getName(){
        return $this->name;
    }

    public function getProject(){
        return $this->project;
    }

    public function setProject($project){
        $this->project = $project;
    }

	public function read_file_excel($file){
		$filepath = $file;
		$res = '';
		$objReader = PHPExcel_IOFactory::createReaderForFile($filepath);
		$objReader->setReadDataOnly(true);
		$objPHPExcel = $objReader->load($filepath);

		$sheetCount = $objPHPExcel->getSheetCount();
		for ($sheet = 0; $sheet < $sheetCount; $sheet++) {

			$worksheet = /*$objPHPExcel->getActiveSheet();*/$objPHPExcel->setActiveSheetIndex($sheet);
			 
			$highestColumm = $worksheet->getHighestColumn();
			$highestRow = $worksheet->getHighestRow();
			for ($row = 1; $row <= $highestRow; $row++) {
				for($i = ord('A'); $i <= ord($highestColumm); $i++)	{
					$col = chr($i);
					$cell = $col . $row;
					$value = $worksheet->getCell($cell)->getValue();
					$res .= $value . ' ';
				}
			}
		}
		$objPHPExcel->disconnectWorksheets();
		return $res;
	}

	public function read_file_pdf($file){
		$filepath = $file;
		$parser = new \Smalot\PdfParser\Parser();
		$pdf    = $parser->parseFile($filepath);
		// Retrieve all pages from the pdf file.
		$pages  = $pdf->getPages();

		// Loop over each page to extract text.
		$text = '';
		foreach ($pages as $page) {
			$text = $text.' '.$page->getText();
		}
		return $text;
	}

	function read_file_txt($file) { // read the txt file content
		$filepath = $file;
		$content = "";
		if (file_exists($filepath)) {
			$file_handler = fopen($filepath, 'r');
			if ($file_handler) {
				while (!feof($file_handler)) {
					$line = fgets($file_handler);
					$content .= $line;
				}
			}
			fclose($file_handler);
		}
		return $content;
	}

	function read_file_docx($file) {
		$filepath = $file;
		return $this->readZippedXML($filepath, "word/document.xml");
	}

	public function read_file_odt($file) {
		$filepath = $file;
		return $this->readZippedXML($filepath, "content.xml");
	}

	public function read_file_doc($file){
		$filename = $file;
		if(file_exists($filename)) {
			if(($fh = fopen($filename, 'r')) !== false ) {
				$headers = fread($fh, 0xA00);
				$n1 = ( ord($headers[0x21C]) - 1 );// 1 = (ord(n)*1) ; Document has from 0 to 255 characters
				$n2 = ( ( ord($headers[0x21D]) - 8 ) * 256 );// 1 = ((ord(n)-8)*256) ; Document has from 256 to 63743 characters
				$n3 = ( ( ord($headers[0x21E]) * 256 ) * 256 );// 1 = ((ord(n)*256)*256) ; Document has from 63744 to 16775423 characters
				$n4 = ( ( ( ord($headers[0x21F]) * 256 ) * 256 ) * 256 );// 1 = (((ord(n)*256)*256)*256) ; Document has from 16775424 to 4294965504 characters
				$textLength = ($n1 + $n2 + $n3 + $n4);// Total length of text in the document
				$extracted_plaintext = fread($fh, $textLength);
				$extracted_plaintext = mb_convert_encoding($extracted_plaintext,'UTF-8');
				// if you want to see your paragraphs in a new line, do this
				// return nl2br($extracted_plaintext);
				$outtext = preg_replace("/[^a-zA-Z0-9\s\,\.\-\n\r\t@\/\_\(\)]/","",$extracted_plaintext);
				return ($outtext);
			} else {
				return '';
			}
		} else {
			return '';
		}
	}

	public function readZippedXML($filename, $dataFile) {
		$striped_content = '';
		$content = '';
		if(!$filename || !file_exists($filename)) return false;
		$zip = zip_open($filename);
		if (!$zip || is_numeric($zip)) return false;
		while ($zip_entry = zip_read($zip)) {
			if (zip_entry_open($zip, $zip_entry) == FALSE) continue;
			if (zip_entry_name($zip_entry) != $dataFile) continue;
			$content .= zip_entry_read($zip_entry, zip_entry_filesize($zip_entry));
			zip_entry_close($zip_entry);
		}// end while
		zip_close($zip);
		$content = str_replace('</w:r></w:p></w:tc><w:tc>', " ", $content);
		$content = str_replace('</w:r></w:p>', "\r\n", $content);
		$striped_content = preg_replace('#<[^>]+>#', ' ', $content);
		return $striped_content;
	}

	public function read_file_rtf($file){
		$filename = $file;
		// Read the data from the input file.
		$text = file_get_contents($filename);
		if (!strlen($text))
			return "";

		// Create empty stack array.
		$document = "";
		$stack = array();
		$j = -1;
		// Read the data character-by- character…
		for ($i = 0, $len = strlen($text); $i < $len; $i++) {
			$c = $text[$i];
			 
			// Depending on current character select the further actions.
			switch ($c) {
				// the most important key word backslash
				case "\\":
					// read next character
					$nc = $text[$i + 1];
						
					// If it is another backslash or nonbreaking space or hyphen,
					// then the character is plain text and add it to the output stream.
					if ($nc == '\\' && $this->rtf_isPlainText($stack[$j])) $document .= '\\';
					elseif ($nc == '~' && $this->rtf_isPlainText($stack[$j])) $document .= ' ';
					elseif ($nc == '_' && $this->rtf_isPlainText($stack[$j])) $document .= '-';
					// If it is an asterisk mark, add it to the stack.
					elseif ($nc == '*') $stack[$j]["*"] = true;
					// If it is a single quote, read next two characters that are the hexadecimal notation
					// of a character we should add to the output stream.
					elseif ($nc == "'") {
						$hex = substr($text, $i + 2, 2);
						if ($this->rtf_isPlainText($stack[$j]))
							$document .= html_entity_decode("&#".hexdec($hex).";");
						//Shift the pointer.
						$i += 2;
						// Since, we’ve found the alphabetic character, the next characters are control word
						// and, possibly, some digit parameter.
					} elseif ($nc >= 'a' && $nc <= 'z' || $nc >= 'A' && $nc <= 'Z') {
						$word = "";
						$param = null;

						// Start reading characters after the backslash.
						for ($k = $i + 1, $m = 0; $k < strlen($text); $k++, $m++) {
							$nc = $text[$k];
							// If the current character is a letter and there were no digits before it,
							// then we’re still reading the control word. If there were digits, we should stop
							// since we reach the end of the control word.
							if ($nc >= 'a' && $nc <= 'z' || $nc >= 'A' && $nc <= 'Z') {
								if (empty($param))
									$word .= $nc;
								else
									break;
								// If it is a digit, store the parameter.
							} elseif ($nc >= '0' && $nc <= '9')
							$param .= $nc;
							// Since minus sign may occur only before a digit parameter, check whether
							// $param is empty. Otherwise, we reach the end of the control word.
							elseif ($nc == '-') {
								if (empty($param))
									$param .= $nc;
								else
									break;
							} else
								break;
						}
						// Shift the pointer on the number of read characters.
						$i += $m - 1;

						// Start analyzing what we’ve read. We are interested mostly in control words.
						$toText = "";
						switch (strtolower($word)) {
							// If the control word is "u", then its parameter is the decimal notation of the
							// Unicode character that should be added to the output stream.
							// We need to check whether the stack contains \ucN control word. If it does,
							// we should remove the N characters from the output stream.
							case "u":
								$toText .= html_entity_decode("&#x".dechex($param).";");
								$ucDelta = @$stack[$j]["uc"];
								if ($ucDelta > 0)
									$i += $ucDelta;
								break;
								// Select line feeds, spaces and tabs.
							case "par": case "page": case "column": case "line": case "lbr":
								$toText .= "\n";
								break;
							case "emspace": case "enspace": case "qmspace":
								$toText .= " ";
								break;
							case "tab": $toText .= "\t"; break;
							// Add current date and time instead of corresponding labels.
							case "chdate": $toText .= date("m.d.Y"); break;
							case "chdpl": $toText .= date("l, j F Y"); break;
							case "chdpa": $toText .= date("D, j M Y"); break;
							case "chtime": $toText .= date("H:i:s"); break;
							// Replace some reserved characters to their html analogs.
							case "emdash": $toText .= html_entity_decode("&mdash;"); break;
							case "endash": $toText .= html_entity_decode("&ndash;"); break;
							case "bullet": $toText .= html_entity_decode("&#149;"); break;
							case "lquote": $toText .= html_entity_decode("&lsquo;"); break;
							case "rquote": $toText .= html_entity_decode("&rsquo;"); break;
							case "ldblquote": $toText .= html_entity_decode("&laquo;"); break;
							case "rdblquote": $toText .= html_entity_decode("&raquo;"); break;
							// Add all other to the control words stack. If a control word
							// does not include parameters, set &param to true.
							default:
								$stack[$j][strtolower($word)] = empty($param) ? true : $param;
								break;
						}
						// Add data to the output stream if required.
						if ($this->rtf_isPlainText($stack[$j]))
							$document .= $toText;
					}
						
					$i++;
					break;
					// If we read the opening brace {, then new subgroup starts and we add
					// new array stack element and write the data from previous stack element to it.
				case "{":
					array_push($stack, $stack[$j++]);
					break;
					// If we read the closing brace }, then we reach the end of subgroup and should remove
					// the last stack element.
				case "}":
					array_pop($stack);
					$j--;
					break;
					// Skip “trash”.
				case '\0': case '\r': case '\f': case '\n': break;
				// Add other data to the output stream if required.
				default:
					if ($this->rtf_isPlainText($stack[$j]))
						$document .= $c;
					break;
			}
		}
		// Return result.
		return $document;
	}

	public function rtf_isPlainText($s) {
		$arrfailAt = array("*", "fonttbl", "colortbl", "datastore", "themedata");
		for ($i = 0; $i < count($arrfailAt); $i++)
			if (!empty($s[$arrfailAt[$i]])) return false;
		return true;
	}

	public function read_file_ppt($file){
		$filename = $file;

		$fileHandle = fopen($filename, "r");
		$line = @fread($fileHandle, filesize($filename));
		$lines = explode(chr(0x0f),$line);
		$outtext = '';

		foreach($lines as $thisline) {
			if (strpos($thisline, chr(0x00).chr(0x00).chr(0x00)) == 1) {
				$text_line = substr($thisline, 4);
				$end_pos   = strpos($text_line, chr(0x00));
				$text_line = substr($text_line, 0, $end_pos);
				$text_line = preg_replace("/[^a-zA-Z0-9\s\,\.\-\n\r\t@\/\_\(\)]/","",$text_line);
				if (strlen($text_line) > 1) {
					$outtext.= substr($text_line, 0, $end_pos)."\n";
				}
			}
		}
		return $outtext;
	}

	public function file_word_count(){

		$content = '';
		$data['wordcount'] = 0;
		$data['error'] = '';

		$file = $this->path;

		if (!empty($file)) {
			if (file_exists($file)) {
				$ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
				//die($ext);
				switch ($ext) {
					case 'txt' :
						$content = $this->read_file_txt($file);
						break;
					case 'docx' :
						$content = $this->read_file_docx($file);
						break;
					case 'odt' :
						$content = $this->read_file_odt($file);
						break;
					case 'doc' :
						$content = $this->read_file_doc($file);
						break;
					case 'rtf' :
						$content = $this->read_file_rtf($file);
						break;
					case 'pdf' :
						$content = $this->read_file_pdf($file);
						break;
					case 'xls' :
						$content = $this->read_file_excel($file);
						break;
					case 'xlsx' :
						$content = $this->read_file_excel($file);
						break;
					case 'xlsm' :
						$content = $this->read_file_excel($file);
						break;
					case 'ppt' :
						$content = $this->read_file_ppt($file);
						break;
					default:
						$data['error'] = 'Invalid File Type';
						break;
				}
			}
		}
		else {
			$content = isset($post['content'])?$post['content']:'';
		}

		if (!empty($content)) {
			/*	$wordcount = count_words_asian_latin($content);
			 $data['wordcount'] = $wordcount['asian_words'] + $wordcount['non_asian_words'];*/
			//	$data['wordcount'] = mb_str_word_count($content);
			$data['wordcount'] = $this->word_counter($content);
			//var_dump($content);
			//var_dump(count_words_asian_latin($content));
		}

		return $data;

	}


	public function word_counter($plain) {
		
		
		

		// CHeck chinese
		preg_match("/\p{Han}+/u", $plain, $matches);
		
		if(count($matches) > 0){
			// Is Chinese
			//$seq = '/[\s\.,;:!\? ]+/mu';
			//$plain = preg_replace('#\{{{.*?\}}}#su', "", $plain);
			//$str = preg_replace($seq, '', $plain);
			//$chars = count(preg_split('//u', $str, -1, PREG_SPLIT_NO_EMPTY));
			//$words = count(preg_split($seq, $plain, -1, PREG_SPLIT_NO_EMPTY));
			
			$str = $plain;
			
			$temStr = $str;
			$str1 = preg_replace("/[^\x{4e00}-\x{9fa5}]+/u", '', $temStr); // 入酒店的
			$countChinese = mb_strlen($str1, 'UTF-8');

			$str2 = preg_replace("/\p{Han}+/u", ' ', $temStr);
			
			$seq = '/[\s\.,;:!\?) ]+/mu';
			$plain = preg_replace('#\{{{.*?\}}}#su', "", $str2);
			$strNew = preg_replace($seq, '', $plain);
			$chars = count(preg_split('//u', $strNew, -1, PREG_SPLIT_NO_EMPTY));
			$wordsArr = preg_split($seq, $plain, -1, PREG_SPLIT_NO_EMPTY);
			
			
			$matchesArr = array('[',']','(',')',' ','"','。',',','.','1','2','3','4',
									'5','6','7','8','9','0',
									'{','}','!','@','，','“','”','（','）','​​');
			$newArr = array();
			foreach ($wordsArr as $key=>$val){
				$wordsArr[$key] = str_replace($matchesArr, '',$val);
				if($wordsArr[$key] != '') $newArr[] = $wordsArr[$key];
			}
			//var_dump($newArr); exit;
			return $countChinese + count($newArr);
			
			
		} else{
			// No Chinese
			$seq = '/[\s\.,;:!\? ]+/mu';
			$plain = preg_replace('#\{{{.*?\}}}#su', "", $plain);
			$str = preg_replace($seq, '', $plain);
			$chars = count(preg_split('//u', $str, -1, PREG_SPLIT_NO_EMPTY));
			$words = count(preg_split($seq, $plain, -1, PREG_SPLIT_NO_EMPTY));

			if ($words === 0) return $chars;
			if ($chars / $words > 12) $words = $chars;
			return $words;
		}
				
		
	}
}