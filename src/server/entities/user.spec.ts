import bcrypt from 'bcrypt';
import { describe, expect, it } from 'vitest';
import User from './user';

describe('User', () => {
  const validUserData = {
    id: '123',
    username: 'test_user',
    email: 'test_user@gmail.com',
    password: 'U(b5Y&%+',
  };

  it('should be defined', () => {
    expect(User).toBeDefined();
  });

  describe('ID rules', () => {
    it('should to be possible to create a new User with an ID', () => {
      const newUser = new User(
        {
          username: validUserData.username,
          email: validUserData.email,
          password: validUserData.password,
        },
        validUserData.id,
      );

      expect(newUser).toBeDefined();
      expect(newUser).toBeInstanceOf(User);
      expect(newUser.id).toBe(validUserData.id);
      expect(newUser.username).toBe(validUserData.username);
      expect(newUser.email).toBe(validUserData.email);
      expect(newUser.password).toBeDefined();
      expect(typeof newUser.password).toBe('string');
      expect(newUser.password.length).toBeGreaterThan(10);
      expect(
        bcrypt.compare(newUser.password, validUserData.password),
      ).toBeTruthy();
    });

    it('should to be possible to create a new User without an ID', () => {
      const newUser = new User({
        username: validUserData.username,
        email: validUserData.email,
        password: validUserData.password,
      });

      expect(newUser).toBeDefined();
      expect(newUser).toBeInstanceOf(User);
      expect(newUser.id).toBeDefined();
      expect(typeof newUser.id).toBe('string');
      expect(newUser.id.length).toBeGreaterThan(5);
      expect(newUser.username).toBe(validUserData.username);
      expect(newUser.email).toBe(validUserData.email);
      expect(newUser.password).toBeDefined();
      expect(typeof newUser.password).toBe('string');
      expect(newUser.password.length).toBeGreaterThan(10);
      expect(
        bcrypt.compare(newUser.password, validUserData.password),
      ).toBeTruthy();
    });

    it('should to throw an error when try to change ID after creating', () => {
      const newUser = new User({
        username: validUserData.username,
        email: validUserData.email,
        password: validUserData.password,
      });

      expect(() => {
        newUser.id = '456';
      }).toThrow('You can not change the ID of a User');
    });
  });

  describe('Username rules', () => {
    it('should to throw an error when username has less then 4 characters', () => {
      const newUser = new User({ ...validUserData });

      expect(() => {
        newUser.username = 'X';
      }).toThrow('A username should have at least 4 characters');

      expect(() => {
        return new User({
          ...validUserData,
          username: '',
        });
      }).toThrow('A username should have at least 4 characters');

      expect(() => {
        return new User({
          ...validUserData,
          username: 'XXX',
        });
      }).toThrow('A username should have at least 4 characters');
    });

    it('should to throw an error when username has more then 16 characters', () => {
      const newUser = new User({ ...validUserData });

      expect(() => {
        newUser.username = 'XXXXXXXXXXXXXXXXXXXX';
      }).toThrow('A username should have at most 16 characters');

      expect(() => {
        return new User({
          ...validUserData,
          username: 'XXXXXXXXXXXXXXXXXXXX',
        });
      }).toThrow('A username should have at most 16 characters');
    });

    it('should to throw an error when username is not a slug', () => {
      const newUser = new User({ ...validUserData });

      expect(() => {
        newUser.username = 'John Doe';
      }).toThrow('A username should be a slug');

      expect(() => {
        return new User({
          ...validUserData,
          username: 'John Doe',
        });
      }).toThrow('A username should be a slug');
    });
  });

  describe('Email rules', () => {
    it('should to throw an error when email is not a email format', () => {
      const newUser = new User({ ...validUserData });

      expect(() => {
        newUser.email = 'test_user';
      }).toThrow('A email should be a valid email format');

      expect(() => {
        return new User({
          ...validUserData,
          email: 'test_user',
        });
      }).toThrow('A email should be a valid email format');

      expect(() => {
        return new User({
          ...validUserData,
          email: '',
        });
      }).toThrow('A email should be a valid email format');
    });
  });

  describe('Password rules', () => {
    it('should to throw an error when password has less then 8 characters', () => {
      const newUser = new User({ ...validUserData });

      expect(() => {
        newUser.password = 'X';
      }).toThrow('A password should have at least 8 characters');

      expect(() => {
        return new User({
          ...validUserData,
          password: 'X',
        });
      }).toThrow('A password should have at least 8 characters');

      expect(() => {
        return new User({
          ...validUserData,
          password: '',
        });
      }).toThrow('A password should have at least 8 characters');
    });

    it('should to throw an error when password has no lowercase letter', () => {
      const newUser = new User({ ...validUserData });

      expect(() => {
        newUser.password = 'XXXXXXXXXXXX';
      }).toThrow('A password should have at least one lowercase letter');

      expect(() => {
        return new User({
          ...validUserData,
          password: 'XXXXXXXXXXXX',
        });
      }).toThrow('A password should have at least one lowercase letter');
    });

    it('should to throw an error when password has no uppercase letter', () => {
      const newUser = new User({ ...validUserData });

      expect(() => {
        newUser.password = 'xxxxxxxxxxxxxx';
      }).toThrow('A password should have at least one uppercase letter');

      expect(() => {
        return new User({
          ...validUserData,
          password: 'xxxxxxxxxxxxxx',
        });
      }).toThrow('A password should have at least one uppercase letter');
    });

    it('should to throw an error when password has no number', () => {
      const newUser = new User({ ...validUserData });

      expect(() => {
        newUser.password = 'XxXxXxXxXxX';
      }).toThrow('A password should have at least one number');

      expect(() => {
        return new User({
          ...validUserData,
          password: 'XxXxXxXxXxX',
        });
      }).toThrow('A password should have at least one number');
    });

    it('should to throw an error when password has no special character', () => {
      const newUser = new User({ ...validUserData });

      expect(() => {
        newUser.password = 'XxXxXxXxXxXx123';
      }).toThrow('A password should have at least one special character');

      expect(() => {
        return new User({
          ...validUserData,
          password: 'XxXxXxXxXxXx123',
        });
      }).toThrow('A password should have at least one special character');
    });
  });
});
