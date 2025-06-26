-- Habilitar la creación de funciones y triggers
SET GLOBAL log_bin_trust_function_creators = 1;

-- Crear función para generar UUIDs si no existe
DELIMITER //
CREATE FUNCTION IF NOT EXISTS UUID_TO_BIN(uuid CHAR(36))
RETURNS BINARY(16)
DETERMINISTIC
BEGIN
    RETURN UNHEX(REPLACE(uuid, '-', ''));
END //
DELIMITER ; 