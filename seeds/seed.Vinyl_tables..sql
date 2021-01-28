BEGIN;
INSERT INTO vinyl_users (user_name,first_name,last_name ,password,email,phone_number )
VALUES
  ('demo',
  'demofirst',
  'demoLast',
  --password: pass1
  '$2a$12$zjujb7acz65IE0DOM1JJ6.iedBs1Opou6.9ADYHW.DwbfxQsw.niG',
  'demoemail@.com',
  '123-123-1234');


INSERT INTO barbers(first_name)
VALUES
  ('Shawn'),
  ('Ben'),
  ('Sara'),
  ('Kelly'),
  ('Travor'),
  ('Cameron');

INSERT INTO services (type , price)
VALUES
  ('HAIRCUT','$20'),
  ('BUZZCUT','$15'),
  ('KID 12 AND UNDER','$10'),
  ('SENIOR CUT 60+','$10'),
  ('DESIGNS','$5'),
  ('BEARD TRIM','$10'),
  ('BEARD TRIM (RAZOR FINISH)','$15'),
  ('HAIRCUT AND BEARD TRIM','$30'),
  ('LUXURY SHAVE','$30');

COMMIT;