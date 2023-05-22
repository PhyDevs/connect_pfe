

namespace Connect.Application.Enums;

public enum ResultState
{
    Faulted,
    Success
}

public readonly struct Result<T>
{
    internal readonly ResultState State;
    internal readonly T Value;
    internal readonly Exception Exception;

    public Result(T value)
    {
        State = ResultState.Success;
        Value = value;
        Exception = null;
    }

    public Result(Exception e)
    {
        State = ResultState.Faulted;
        Exception = e;
        Value = default(T);
    }

    public static implicit operator Result<T>(T value) =>
        new Result<T>(value);

    public static implicit operator Result<T>(Exception e) =>
        new Result<T>(e);

    public bool IsSuccess =>
        State == ResultState.Success;

    public U Match<U>(Func<T, U> Succ, Func<Exception, U> Fail) =>
        IsSuccess
            ? Succ(Value)
            : Fail(Exception);

}
