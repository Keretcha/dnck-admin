'use client';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import Button from '../Components/Button/Button';
import { ButtonTypeEnum } from '../Components/Button/enums/button-type.enum';
import Heading from '../Components/Heading/Heading';
import { HeadingTypeEnum } from '../Components/Heading/enums/heading-type.enum';
import Text from '../Components/Text/Text';
import { TextHtmlTypeEnum } from '../Components/Text/enums/text-html-type.enum';
import { TextTypeEnum } from '../Components/Text/enums/text-type.enum';
import styles from './sign-up.module.scss';
import { SignUpTypes } from './types/sign-up.type';

const SignUp: SignUpTypes = () => {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm();

  const password: string = watch('password');
  const rePassword: string = watch('rePassword');
  const onSubmit = async (values: object): Promise<void> => {
    if (password !== rePassword) {
      setError('password', {});
      return;
    }

    try {
      await axios.post('https://back.dnck.ge/auth/register', values);
      console.log('User registered successfully');
    } catch (err) {
      console.error('Can not load this page', err);
    }
  };

  return (
    <div className="container">
      <div className={styles.content}>
        <div className={styles.test}>
          <div className={styles.image}>
            <Image
              src={'/icons/test1.svg'}
              alt={'pink floyd'}
              width={644}
              height={575}
            />
          </div>
          <div>
            <form
              className={styles.authorizationForm}
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className={styles.signInHeading}>
                <Heading type={HeadingTypeEnum.H1}>
                  Sign Up
                  <span className={styles.projectName}> DNCK.</span>
                </Heading>
              </div>
              <div className={styles.inputs}>
                <label>Email</label>
                <input
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                  })}
                  className={styles.authorizationInput}
                  placeholder="Enter Your Email"
                />
                {errors.name && (
                  <span className={styles.error}>{`incorrect email`}</span>
                )}
              </div>
              <div className={styles.inputs}>
                <label>Password</label>
                <input
                  type="password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: 8,
                  })}
                  className={styles.authorizationInput}
                  placeholder="Enter Your Password"
                />
                {errors.password && (
                  <span className={styles.error}>{`incorrect password `}</span>
                )}
              </div>
              <div className={styles.inputs}>
                <label>Re-enter Password</label>
                <input
                  type="password"
                  {...register('rePassword', {
                    required: 'Please re-enter your password',
                  })}
                  className={styles.authorizationInput}
                  placeholder="Re-enter Your Password"
                />
                {errors.rePassword && (
                  <span
                    className={styles.error}
                  >{`Password don't match ${window.alert(`Password don't match`)}`}</span>
                )}
              </div>
              <div className={styles.check}>
                <input className={styles.checkbox} type="checkbox" />
                <label>Remember me</label>
              </div>
              <div className={styles.buttonContainer}>
                <Button
                  className={styles.button}
                  type={ButtonTypeEnum.Primary}
                  htmlType={'submit'}
                  href={'/uploaded'}
                >
                  Sign Up
                </Button>
                <Text
                  className={styles.signUpContainer}
                  htmlType={TextHtmlTypeEnum.Span}
                  type={TextTypeEnum.PrimaryTextLarge}
                >
                  Already a member ?
                  <Link className={styles.signUp} href={'/'}>
                    Log In
                  </Link>
                </Text>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
