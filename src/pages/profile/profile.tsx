import styles from "./profile.module.css";
import { Button, EmailInput, PasswordInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";

import { userNameData, userEmailData } from '../../services/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';

import { updateUserInfo } from '../../services/actions/auth';

import ProfileNavigation from "../../components/profile-navigation/profile-navigation";

export const Profile = () => {
    const dispatch = useDispatch();

    const userNameInfo = useSelector(userNameData);
    const userEmailInfo = useSelector(userEmailData);

    const form = useForm({ name: userNameInfo, email: userEmailInfo, password: '' });

    //сброс данных
    function handleReset() {
        form.setValues({ name: userNameInfo, email: userEmailInfo, password: '' });
    }

    //обновить данные 
    //evt: FormEvent<HTMLFormElement>
    function handleUpdate(evt: React.SyntheticEvent) {
        evt.preventDefault();
        dispatch<any>(updateUserInfo(form.values.name, form.values.email, form.values.password))
        form.setValues({
            ...form.values,
            password: ''
        })
    }

    return (
        <main className={styles.main}>
            <div className={styles.container}>

                <ProfileNavigation />

                <section className={styles.inputpanel}>
                    <form onSubmit={handleUpdate}>
                        <Input
                            type={'text'}
                            placeholder={'Имя'}
                            icon="EditIcon"
                            name={'name'}
                            error={false}
                            errorText={'Ошибка'}
                            size={'default'}
                            onChange={form.handleChange}
                            value={form.values.name}
                            autoComplete="username"
                        />
                        <EmailInput
                            name={'email'}
                            extraClass="mt-6"
                            placeholder="E-mail"
                            isIcon={true}
                            onChange={form.handleChange}
                            value={form.values.email}
                            autoComplete="email"
                        />
                        <PasswordInput
                            name={'password'}
                            icon="EditIcon"
                            extraClass="mt-6"
                            onChange={form.handleChange}
                            value={form.values.password}
                            autoComplete="current-password"
                        />

                        <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6">Сохранить</Button>
                        <Button htmlType="button" type="secondary" size="medium" extraClass="mt-6" onClick={handleReset}>Отмена</Button>

                    </form>
                </section>

            </div>
        </main >
    );
}; 