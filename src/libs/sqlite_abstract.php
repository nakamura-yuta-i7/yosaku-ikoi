<?php
class SqliteAbstract {
	
	public $table = null;
	protected function setTable() {
		$class = get_class($this);
		$table = decamelize($class);
		$this->table = $table;
	}
	public $pdo = null;
	private static $_connection = null;
	function __construct($dsn) {
		$this->setTable();
		if ( ! is_null(self::$_connection) ) {
			return $this->pdo = self::$_connection;
		}
		$this->pdo = new PDO(
			"sqlite:" . $dsn
		);
		$this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$this->pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
		self::$_connection = $this->pdo;
	}
	function getLastInsertId() {
		return $this->pdo->lastInsertId();
	}
	function beginTransaction() {
		$this->pdo->beginTransaction();
	}
	function commit() {
		$this->pdo->commit();
	}
	function rollBack() {
		$this->pdo->rollBack();
	}
	function query($sql) {
		$this->stmt = $this->pdo->query($sql);
		return $this;
	}
	function save($values, Array $conditions) {
		$foundRows = $this->findAll(compact("conditions"));
		if ( count($foundRows) > 1 ) {
			throw new ErrorException("save() condition error.  because: foundRows > 1 ");
		}
		if ( count($foundRows) == 1 ) {
			$this->update($values, $conditions);
		} else {
			$this->insert($values);
		}
	}
	function fetchAll() {
		return $this->stmt->fetchAll();
	}
	function findAll($params=[]) {
		$where = "";
		if ( array_key_exists("conditions", $params) ) {
			$conditions = $params["conditions"];
			$where = "WHERE " . static::_createWhere($conditions);
		}
		$table = $this->table;
		$sql = "SELECT * FROM {$table} {$where}";
		$this->query($sql);
		return $this->stmt->fetchAll();
	}
	function insert($values) {
		if ( ! array_key_exists("created", $values) ) {
			$values["created"] = date_create()->format("Y-m-d H:i:s");
		}
		$columns = [];
		$vals = [];
		foreach ($values as $key => $value) {
			$colums[] = $key;
			if ( is_null($value) ) {
				$value = "NULL";
			} else if ( ! is_int($value) ) {
				$value = "'{$value}'";
			}
			$vals[] = $value;
		}
		$table = $this->table;
		$colum_names = implode(",", $colums);
		$value_strings = implode(",", $vals);
		$sql = "INSERT INTO {$table} ( {$colum_names} ) VALUES ( {$value_strings} )";
		$this->query($sql);
		return $this;
	}
	function update(Array $values, $conditions) {
		$condition_string = static::_createWhere($conditions);
		$table = $this->table;
		$set_strings = [];
		foreach ($values as $colname => $value ) {
			if ( is_null($value) ) {
				$value = "NULL";
			} elseif ( ! is_int($value) ) {
				$value = "'{$value}'";
			} else {
				$value = "{$value}";
			}
			$set_strings[] = " `$colname` = $value ";
		}
		$set_strings = implode(",", $set_strings);
		$sql = "UPDATE {$table} SET {$set_strings} WHERE {$condition_string} ";
		$this->query($sql);
		return $this;
	}
	function delete($conditions) {
		$condition_string = static::_createWhere($conditions);
		$table = $this->table;
		$sql = "DELETE FROM {$table} WHERE {$condition_string} ";
		$this->query($sql);
		return $this;
	}
	function findById($id) {
		$table = $this->table;
		$condition_string = static::_createWhere([
			"id" => $id,
		]);
		$sql = "SELECT * FROM {$table} WHERE $condition_string LIMIT 1 ";
		$result = $this->query($sql)->fetchAll();
		return $result ? $result[0] : false;
	}
	function findOne(Array $conditions) {
		$table = $this->table;
		$condition_string = static::_createWhere($conditions);
		$sql = "SELECT * FROM {$table} WHERE $condition_string LIMIT 1 ";
		$result = $this->query($sql)->fetchAll();
		return $result ? $result[0] : false;
	}
	private static function _createWhere($values) {
		if ( ! $values ) {
			return $condition_string = " 1 = 1 ";
			
		} elseif ( ! is_array($values) ) {
			return $values;
		}
		$condition_string = "";
		$i = 0;
		foreach ($values as $colname => $value) {
			$i++;
			if ( $i > 1 ) {
				$condition_string .= " AND ";
			}
			$colname = "`{$colname}`";
			
			if ( preg_match("/LIKE '/", strtoupper($value)) ) {
				$value = $value;
			} elseif ( is_null($value) ) {
				$value = " IS NULL";
			} elseif ( strtoupper($value) == "IS NOT NULL" ) {
				$value = " IS NOT NULL";
			} elseif ( ! is_int($value) ) {
				$value = " = '{$value}'";
			} elseif ( is_int($value) ) {
				$value = " = {$value}";
			}
			$condition_string .= " $colname $value ";
		}
		return $condition_string;
	}
}
