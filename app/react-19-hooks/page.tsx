import Link from 'next/link';

export default function React19HooksExamples() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">React 19 Hooks Examples</h1>
      <ul className="list-disc pl-5">
        <li>
          <Link
            href="/react-19-hooks/use-hook"
            className="text-blue-500 hover:underline"
          >
            use Hook Example
          </Link>
        </li>
        <li>
          <Link
            href="/react-19-hooks/action-state"
            className="text-blue-500 hover:underline"
          >
            useActionState Example
          </Link>
        </li>
        <li>
          <Link
            href="/react-19-hooks/use-form-status"
            className="text-blue-500 hover:underline"
          >
            useFormStatus Example
          </Link>
        </li>
        <li>
          <Link
            href="/react-19-hooks/use-optimistic"
            className="text-blue-500 hover:underline"
          >
            useOptimistic Example
          </Link>
        </li>
      </ul>
    </div>
  );
}
