BEGIN;
INSERT INTO covidapi_users (user_name,first_name,last_name ,password,email,phone_number )
VALUES
  ('demo',
  'demofirst',
  'demoLast',
  --password: pass1
  '$2a$12$zjujb7acz65IE0DOM1JJ6.iedBs1Opou6.9ADYHW.DwbfxQsw.niG',
  'demoemail@.com',
  '123-123-1234');


INSERT INTO walkers(first_name)
VALUES
  ('Shawn'),
  ('Ben'),
  ('Sara'),
  ('Kelly'),
  ('Travor'),
  ('Cameron');

INSERT INTO services (type , price)
VALUES
  ('Single dog','$20'),
  ('Two dogs','$25'),
  ('Three dogs','$30'),
  ('Four dogs (Maximum)','$35'),

COMMIT;