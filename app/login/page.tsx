'use client';

import axios, { AxiosResponse } from 'axios';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import Button from '../Components/Button/Button';
import { ButtonTypeEnum } from '../Components/Button/enums/button-type.enum';
import Heading from '../Components/Heading/Heading';
import { HeadingTypeEnum } from '../Components/Heading/enums/heading-type.enum';
import styles from './Authorization.module.scss';
import { setCookie } from '@/helpers/cookies';

const LoginForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router: AppRouterInstance = useRouter();

  const onSubmit = async (values: FieldValues): Promise<void> => {

    // TODO: Refactor This Call To Axios Config

    try {
      const response: AxiosResponse = await axios.post(
        'https://back.dnck.ge/auth/login',
        values,
      );
      const { accessToken } = response.data;

      if (accessToken) {
        setCookie('accessToken', accessToken, 60);
        console.log('User logged in successfully');
        router.push('/');
      } else {
        alert('password is not correct');
      }
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className={`${styles.container} ${styles.darkContainer}`}>
      <div className={`${styles.content} ${styles.darkContent}`}>
        <div className={styles.test}>
          <div className={styles.image}>
            <Image
              src={'/icons/test1.svg'}
              alt={'brand'}
              width={644}
              height={575}
              className={styles.image}
            />
          </div>
          <div className={styles.form}>
            <form
              className={styles.authorizationForm}
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className={styles.signInHeading}>
                <Heading type={HeadingTypeEnum.H2}>
                  Log in
                  <span className={styles.projectName}> DNCK </span>
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
                {errors.email && (
                  <span className={styles.error}>{`errors.email.message`}</span>
                )}
              </div>
              <div className={styles.inputs}>
                <label>Password</label>
                <input
                  type="password"
                  {...register('password', {
                    required: 'Password is required',
                  })}
                  className={`${styles.authorizationInput} ${styles.darkAuthorizationInput}`}
                  placeholder="Enter Your Password"
                />
                {errors.password && (
                  <span className={styles.error}>
                    {`errors.password.message`}
                  </span>
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
                  href="/"
                >
                  Log In
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
