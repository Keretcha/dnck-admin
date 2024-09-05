'use client';
import axios, { AxiosResponse } from 'axios';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Button from '../Components/Button/Button';
import { ButtonTypeEnum } from '../Components/Button/enums/button-type.enum';
import Heading from '../Components/Heading/Heading';
import { HeadingTypeEnum } from '../Components/Heading/enums/heading-type.enum';
import Text from '../Components/Text/Text';
import { TextHtmlTypeEnum } from '../Components/Text/enums/text-html-type.enum';
import { TextTypeEnum } from '../Components/Text/enums/text-type.enum';
import styles from './Authorization.module.scss';
import { AuthorizationType } from './types/authorization.type';

const Authorization: AuthorizationType = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router: AppRouterInstance = useRouter();

  const onSubmit = async (values: object): Promise<void> => {
    try {
      const response: AxiosResponse = await axios.post(
        'http://10.10.51.20:3000/auth/login',
        values,
      );
      const { accessToken } = response.data;
      // const token: string | null = localStorage.getItem(accessToken);

      // if (token) {
      //   router.push('/mainPage');
      // }
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        console.log('User logged in successfully');
        router.push('/mainPage');
      } else {
        alert('sworad wera tu ar ici nu dadzvrebi ');
      }
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  return (
    <div className="container">
      <div className={styles.content}>
        <div className={styles.test}>
          <div className={styles.image}>
            <Image
              src={'/icons/test1.svg'}
              alt={'brand'}
              width={644}
              height={575}
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
                  className={styles.authorizationInput}
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
                <Text
                  className={styles.signUpContainer}
                  htmlType={TextHtmlTypeEnum.Span}
                  type={TextTypeEnum.PrimaryTextLarge}
                >
                  New to DCNK?
                  <Link className={styles.signUp} href={'/signUp'}>
                    Sign up
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

export default Authorization;
