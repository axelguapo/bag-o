import { Head, router } from '@inertiajs/react';
import { Pencil, Plus, Search, Trash2, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import students from '@/routes/students';

type Student = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    program: string;
    gender: string;
    birthday: string;
    yr_level: string;
};

type Props = {
    students: Student[];
    student?: Student | null;
};

const emptyForm = {
    first_name: '',
    last_name: '',
    email: '',
    program: '',
    gender: 'female',
    birthday: '',
    yr_level: '1',
};

export default function StudentsIndex({
    students: studentList,
    student,
}: Props) {
    const [form, setForm] = useState<StudentForm>(
        student
            ? {
                  first_name: student.first_name,
                  last_name: student.last_name,
                  email: student.email,
                  program: student.program,
                  gender: student.gender,
                  birthday: student.birthday,
                  yr_level: student.yr_level,
              }
            : emptyForm,
    );
    const [search, setSearch] = useState('');

    const filteredStudents = studentList.filter((item) => {
        const query = search.trim().toLowerCase();

        if (!query) {
            return true;
        }

        return (
            `${item.first_name} ${item.last_name}`
                .toLowerCase()
                .includes(query) ||
            item.program.toLowerCase().includes(query) ||
            item.email.toLowerCase().includes(query)
        );
    });

    const isEditing = Boolean(student);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const payload = {
            ...form,
        };

        if (isEditing && student) {
            router.put(students.update(student.id), payload);

            return;
        }

        router.post(students.store(), payload);
    };

    const handleDelete = (id: number) => {
        if (!confirm('Delete this student?')) {
            return;
        }

        router.delete(students.destroy(id));
    };

    return (
        <>
            <Head title="Students" />

            <div className="space-y-6 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">Students</h1>
                        <p className="text-sm text-muted-foreground">
                            Manage the student roster.
                        </p>
                    </div>
                    <Button
                        type="button"
                        onClick={() => {
                            setForm(emptyForm);
                            router.get(students.index());
                        }}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        New student
                    </Button>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                    <div className="rounded-xl border bg-card p-4 shadow-sm">
                        <div className="mb-4 flex items-center justify-between gap-3">
                            <h2 className="text-lg font-medium">
                                Student list
                            </h2>
                            <div className="flex w-full max-w-sm items-center gap-2">
                                <Input
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
                                    placeholder="Search students"
                                    className="h-9"
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="h-9"
                                >
                                    <Search className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {filteredStudents.length === 0 ? (
                                <p className="text-sm text-muted-foreground">
                                    No students found.
                                </p>
                            ) : (
                                filteredStudents.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center justify-between rounded-lg border p-3"
                                    >
                                        <div>
                                            <p className="font-medium">
                                                {item.first_name}{' '}
                                                {item.last_name}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {item.program} • {item.yr_level}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    router.get(
                                                        students.show(item.id),
                                                    )
                                                }
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                onClick={() =>
                                                    handleDelete(item.id)
                                                }
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="rounded-xl border bg-card p-4 shadow-sm"
                    >
                        <div className="mb-4 flex items-center gap-2">
                            <UserPlus className="h-4 w-4" />
                            <h2 className="text-lg font-medium">
                                {isEditing ? 'Edit student' : 'Add student'}
                            </h2>
                        </div>

                        <div className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="first_name">First name</Label>
                                <Input
                                    id="first_name"
                                    value={form.first_name}
                                    onChange={(event) =>
                                        setForm((current) => ({
                                            ...current,
                                            first_name: event.target.value,
                                        }))
                                    }
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="last_name">Last name</Label>
                                <Input
                                    id="last_name"
                                    value={form.last_name}
                                    onChange={(event) =>
                                        setForm((current) => ({
                                            ...current,
                                            last_name: event.target.value,
                                        }))
                                    }
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={form.email}
                                    onChange={(event) =>
                                        setForm((current) => ({
                                            ...current,
                                            email: event.target.value,
                                        }))
                                    }
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="program">Program</Label>
                                <Input
                                    id="program"
                                    value={form.program}
                                    onChange={(event) =>
                                        setForm((current) => ({
                                            ...current,
                                            program: event.target.value,
                                        }))
                                    }
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="gender">Gender</Label>
                                <Input
                                    id="gender"
                                    value={form.gender}
                                    onChange={(event) =>
                                        setForm((current) => ({
                                            ...current,
                                            gender: event.target.value,
                                        }))
                                    }
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="birthday">Birthday</Label>
                                <Input
                                    id="birthday"
                                    type="date"
                                    value={form.birthday}
                                    onChange={(event) =>
                                        setForm((current) => ({
                                            ...current,
                                            birthday: event.target.value,
                                        }))
                                    }
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="yr_level">Year level</Label>
                                <Input
                                    id="yr_level"
                                    value={form.yr_level}
                                    onChange={(event) =>
                                        setForm((current) => ({
                                            ...current,
                                            yr_level: event.target.value,
                                        }))
                                    }
                                />
                            </div>

                            <div className="flex gap-2 pt-2">
                                <Button type="submit">
                                    {isEditing
                                        ? 'Update student'
                                        : 'Save student'}
                                </Button>
                                {isEditing && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            setForm(emptyForm);
                                            router.get(students.index());
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

StudentsIndex.layout = {
    breadcrumbs: [
        {
            title: 'Students',
            href: students.index(),
        },
    ],
};

type StudentForm = {
    first_name: string;
    last_name: string;
    email: string;
    program: string;
    gender: string;
    birthday: string;
    yr_level: string;
};
